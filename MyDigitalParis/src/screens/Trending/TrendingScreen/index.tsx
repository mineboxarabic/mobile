import React, { useMemo, useState, useCallback } from "react";
import { View, Pressable, FlatList, RefreshControl, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "../../../components/atoms/Text";
import { Button } from "../../../components/atoms/Button";

type Category = "All" | "News" | "Sports" | "Crypto" | "Politics";

type Market = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  yesPrice: number;      // 0..1
  change24h: number;     // %
  volume24h: number;     // $
  createdAt: number;     // ms
  endsAt: number;        // ms
  breaking?: boolean;
};

const now = Date.now();
const MOCK: Market[] = [
  {
    id: "m1",
    title: "Will BTC close above $70k this week?",
    category: "Crypto",
    yesPrice: 0.62,
    change24h: 7.8,
    volume24h: 184320,
    createdAt: now - 4 * 60 * 60 * 1000,
    endsAt: now + 12 * 60 * 60 * 1000,
    breaking: true,
  },
  {
    id: "m2",
    title: "Will Candidate Y lead national polls?",
    category: "Politics",
    yesPrice: 0.47,
    change24h: -2.1,
    volume24h: 132100,
    createdAt: now - 22 * 60 * 60 * 1000,
    endsAt: now + 6 * 60 * 60 * 1000,
    breaking: true,
  },
  {
    id: "m3",
    title: "Will Team Alpha win the Championship Final?",
    category: "Sports",
    yesPrice: 0.44,
    change24h: 3.3,
    volume24h: 90320,
    createdAt: now - 3 * 60 * 60 * 1000,
    endsAt: now + 30 * 60 * 1000,
  },
  {
    id: "m4",
    title: "Will Movie X surpass $200M opening weekend?",
    category: "News",
    yesPrice: 0.35,
    change24h: 5.9,
    volume24h: 55310,
    createdAt: now - 1 * 60 * 60 * 1000,
    endsAt: now + 3 * 24 * 60 * 60 * 1000,
  },
  {
    id: "m5",
    title: "Will ETH flip SOL in market cap this quarter?",
    category: "Crypto",
    yesPrice: 0.29,
    change24h: -1.8,
    volume24h: 77120,
    createdAt: now - 2 * 60 * 60 * 1000,
    endsAt: now + 18 * 60 * 60 * 1000,
    breaking: true,
  },
];

const within24h = (endsAt: number) => endsAt - Date.now() <= 24 * 60 * 60 * 1000;

const timeLeft = (endsAt: number) => {
  const diff = Math.max(0, endsAt - Date.now());
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
};

const shortNum = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M`
  : n >= 1_000    ? `${(n / 1_000).toFixed(1)}k`
  : `${n}`;

const catEmoji: Record<Exclude<Category, "All">, string> = {
  News: "📰",
  Sports: "🏟️",
  Crypto: "🪙",
  Politics: "🏛️",
};

const Badge = ({ text, tone = "zinc" }: { text: string; tone?: "zinc" | "red" | "amber" }) => {
  const tones: Record<string, string> = {
    zinc: "bg-zinc-100 text-zinc-700 border-zinc-200",
    red: "bg-red-50 text-red-600 border-red-200",
    amber: "bg-amber-50 text-amber-600 border-amber-200",
  };
  return (
    <View className={`px-2 py-1 rounded-full border ${tones[tone]}`}>
      <Text className="text-[10px] font-semibold">{text}</Text>
    </View>
  );
};

const Chip = ({ label, active, onPress }: { label: Category; active: boolean; onPress: () => void }) => (
  <Pressable
    onPress={onPress}
    className={`px-3 py-2 rounded-2xl border ${
      active ? "bg-indigo-500/10 border-indigo-500" : "bg-transparent border-zinc-300"
    }`}
  >
    <Text className={`text-xs ${active ? "text-indigo-600 font-semibold" : "text-zinc-700"}`}>{label}</Text>
  </Pressable>
);

const MarketCard = ({ m, onPress }: { m: Market; onPress: () => void }) => {
  const noPrice = 1 - m.yesPrice;
  const up = m.change24h >= 0;
  const urgent = within24h(m.endsAt);

  return (
    <Pressable
      onPress={onPress}
      className="mb-5 rounded-2xl border border-zinc-200 bg-white px-4 pt-4 pb-3"
      style={{ elevation: 3 }}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-3">
          <View className="w-9 h-9 rounded-full bg-zinc-100 items-center justify-center">
            <Text className="text-base">{catEmoji[m.category]}</Text>
          </View>
          <View className="max-w-[75%]">
            <Text className="text-[12px] text-zinc-500">{m.category}</Text>
            <Text numberOfLines={2} className="text-[15px] font-semibold text-zinc-900">
              {m.title}
            </Text>
          </View>
        </View>
        <View className="items-end gap-1">
          {m.breaking && <Badge text="🚨 Breaking" tone="red" />}
          <Badge text={`⏳ ${timeLeft(m.endsAt)}`} tone={urgent ? "amber" : "zinc"} />
        </View>
      </View>

      {/* Prices */}
      <View className="flex-row gap-3 mb-3">
        <View className="flex-1 p-3 rounded-xl bg-zinc-50">
          <Text className="text-[11px] text-zinc-500 mb-1">YES</Text>
          <Text className="text-[22px] font-bold text-zinc-900">{Math.round(m.yesPrice * 100)}¢</Text>
        </View>
        <View className="flex-1 p-3 rounded-xl bg-zinc-50">
          <Text className="text-[11px] text-zinc-500 mb-1">NO</Text>
          <Text className="text-[22px] font-bold text-zinc-900">{Math.round(noPrice * 100)}¢</Text>
        </View>
        <View className="w-[92px] p-3 rounded-xl bg-zinc-50 items-center justify-center">
          <Text className={`${up ? "text-emerald-600" : "text-rose-600"} text-[12px] font-semibold`}>
            {up ? "▲" : "▼"} {Math.abs(m.change24h).toFixed(1)}%
          </Text>
          <Text className="text-[10px] text-zinc-500">24h</Text>
        </View>
      </View>

      {/* Volume + Bar */}
      <View>
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-[12px] text-zinc-500">Vol 24h</Text>
          <Text className="text-[12px] text-zinc-800 font-medium">${shortNum(m.volume24h)}</Text>
        </View>
        <View className="h-2 rounded-full bg-zinc-100 overflow-hidden">
          <View
            className={`${up ? "bg-emerald-500" : "bg-rose-500"} h-2`}
            style={{ width: `${Math.min(100, 20 + (m.volume24h % 80))}%` }}
          />
        </View>
      </View>

      {/* Actions */}
      <View className="mt-4 flex-row gap-3">
        <Button title="Buy YES" onPress={() => console.log("Buy YES", m.id)} className="flex-1 bg-emerald-600" />
        <Button title="Sell / NO" onPress={() => console.log("Sell NO", m.id)} className="flex-1 bg-rose-600" />
      </View>
    </Pressable>
  );
};

export default function BreakingScreen() {
  const [cat, setCat] = useState<Category>("All");
  const [refreshing, setRefreshing] = useState(false);

  const data = useMemo(() => {
    let list = MOCK.filter((m) => m.breaking || within24h(m.endsAt));
    if (cat !== "All") list = list.filter((m) => m.category === cat);
    return list.sort((a, b) => Number(!!b.breaking) - Number(!!a.breaking) || a.endsAt - b.endsAt);
  }, [cat]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  const Header = (
    <View>
      {/* Top bar */}
      <View className="px-5 py-4 bg-white border-b border-zinc-200">
        <Text className="text-2xl font-extrabold text-red-600">🚨 Breaking</Text>
        <Text className="text-sm text-zinc-600 mt-1">
          Markets ending within 24h or marked as Breaking.
        </Text>

        {/* Category menu */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3" contentContainerStyle={{ gap: 8 }}>
          {(["All", "News", "Sports", "Crypto", "Politics"] as Category[]).map((c) => (
            <Chip key={c} label={c} active={c === cat} onPress={() => setCat(c)} />
          ))}
        </ScrollView>
      </View>
      <View className="h-[1px] bg-zinc-200" />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-50">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MarketCard
            m={item}
            onPress={() => {
              try {
                // If you have a details route, replace with your navigation:
                // navigation.navigate("BetDetails", { id: item.id });
                console.log("Open market", item.id);
              } catch {
                console.log("Open market", item.id);
              }
            }}
          />
        )}
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
}
