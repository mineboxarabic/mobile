import { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";




type Category = "Sports" | "Politics" | "Crypto" | "Entertainment";
type Market = {
  id: string;
  title: string;
  category: Category;
  yesPrice: number;   // 0..1
  change24h: number;  // %
  volume24h: number;  // $
  createdAt: number;
  endsAt: number;
  breaking?: boolean;
};

const now = Date.now();
const MOCK: Market[] = [
  {
    id: "m1",
    title: "Will BTC close the week above $70k?",
    category: "Crypto",
    yesPrice: 0.62,
    change24h: 7.8,
    volume24h: 184320,
    createdAt: now - 4 * 60 * 60 * 1000,
    endsAt: now + 2 * 24 * 60 * 60 * 1000,
  },
  {
    id: "m2",
    title: "Will Team Alpha win the Championship Final?",
    category: "Sports",
    yesPrice: 0.44,
    change24h: -3.1,
    volume24h: 90320,
    createdAt: now - 1 * 60 * 60 * 1000,
    endsAt: now + 6 * 60 * 60 * 1000,
    breaking: true,
  },
  {
    id: "m3",
    title: "Will Candidate Y lead national polls by month-end?",
    category: "Politics",
    yesPrice: 0.57,
    change24h: 1.2,
    volume24h: 132100,
    createdAt: now - 3 * 24 * 60 * 60 * 1000,
    endsAt: now + 7 * 24 * 60 * 60 * 1000,
  },
  {
    id: "m4",
    title: "Will Movie X surpass $200M opening weekend?",
    category: "Entertainment",
    yesPrice: 0.35,
    change24h: 5.9,
    volume24h: 55310,
    createdAt: now - 22 * 60 * 60 * 1000,
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
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1_000 ? `${(n / 1_000).toFixed(1)}k` : `${n}`;

const catEmoji: Record<Category, string> = {
  Sports: "🏟️",
  Politics: "🏛️",
  Crypto: "🪙",
  Entertainment: "🎬",
};

/* ---------- Small UI ---------- */
const SegButton = ({
  label,
  active,
  onPress,
}: { label: string; active?: boolean; onPress?: () => void }) => (
  <Pressable
    onPress={onPress}
    className={`px-4 py-2 rounded-xl ${active ? "bg-indigo-600" : "bg-zinc-100 dark:bg-zinc-800"}`}
  >
    <Text className={`text-[12px] ${active ? "text-white font-semibold" : "text-zinc-700 dark:text-zinc-200"}`}>
      {label}
    </Text>
  </Pressable>
);

const Chip = ({
  label,
  active,
  onPress,
}: { label: string; active?: boolean; onPress?: () => void }) => (
  <Pressable
    onPress={onPress}
    className={`px-3 py-2 rounded-2xl border ${
      active ? "bg-indigo-500/10 border-indigo-500" : "bg-transparent border-zinc-300 dark:border-zinc-700"
    }`}
  >
    <Text className={`text-xs ${active ? "text-indigo-600 font-semibold" : "text-zinc-700 dark:text-zinc-300"}`}>
      {label}
    </Text>
  </Pressable>
);

const Badge = ({ text, tone = "zinc" }: { text: string; tone?: "zinc" | "red" | "amber" | "emerald" | "rose" }) => {
  const tones: Record<string, string> = {
    zinc: "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700",
    red: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/40",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/40",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/40",
    rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/40",
  };
  return (
    <View className={`px-2 py-1 rounded-full border ${tones[tone]}`}>
      <Text className="text-[10px] font-semibold">{text}</Text>
    </View>
  );
};

/* ---------- Market Card ---------- */
const MarketCard = ({ m, onBuy, onSell }: { m: Market; onBuy: () => void; onSell: () => void }) => {
  const noPrice = 1 - m.yesPrice;
  const up = m.change24h >= 0;
  const urgent = m.endsAt - Date.now() <= 24 * 60 * 60 * 1000;

  return (
    <View
      className="mb-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
      style={{ elevation: 2 }} 
    >
      {/* header */}
      <View className="flex-row items-center justify-between px-4 pt-4">
        <View className="flex-row items-center gap-3">
          <View className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 items-center justify-center">
            <Text className="text-base">{catEmoji[m.category]}</Text>
          </View>
          <View className="max-w-[75%]">
            <Text className="text-[12px] text-zinc-500 dark:text-zinc-400">{m.category}</Text>
            <Text numberOfLines={2} className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-50">
              {m.title}
            </Text>
          </View>
        </View>
        <View className="items-end gap-1">
          {m.breaking && <Badge text="🚨 Breaking" tone="red" />}
          <Badge text={`⏳ ${timeLeft(m.endsAt)}`} tone={urgent ? "amber" : "zinc"} />
        </View>
      </View>

      {/* prices */}
      <View className="flex-row px-4 mt-4 gap-3">
        <View className="flex-1 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800">
          <Text className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">YES</Text>
          <Text className="text-[22px] font-bold text-zinc-900 dark:text-zinc-50">{Math.round(m.yesPrice * 100)}¢</Text>
        </View>
        <View className="flex-1 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800">
          <Text className="text-[11px] text-zinc-500 dark:text-zinc-400 mb-1">NO</Text>
          <Text className="text-[22px] font-bold text-zinc-900 dark:text-zinc-50">{Math.round(noPrice * 100)}¢</Text>
        </View>
        <View className="w-[92px] p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 items-center justify-center">
          <Text className={`${up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"} text-[12px] font-semibold`}>
            {up ? "▲" : "▼"} {Math.abs(m.change24h).toFixed(1)}%
          </Text>
          <Text className="text-[10px] text-zinc-500 dark:text-zinc-400">24h</Text>
        </View>
      </View>

      {/* volume bar */}
      <View className="px-4 mt-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-[12px] text-zinc-500 dark:text-zinc-400">Vol 24h</Text>
          <Text className="text-[12px] text-zinc-900 dark:text-zinc-200 font-medium">${shortNum(m.volume24h)}</Text>
        </View>
        <View className="mt-2 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <View
            className={`h-2 ${up ? "bg-emerald-500" : "bg-rose-500"}`}
            style={{ width: `${Math.min(100, 20 + (m.volume24h % 80))}%` }}
          />
        </View>
      </View>

      {/* actions */}
      <View className="flex-row gap-3 px-4 py-4">
        <Pressable onPress={onBuy} className="flex-1 items-center py-3 rounded-xl bg-emerald-600 active:bg-emerald-700">
          <Text className="text-white font-semibold">Buy YES</Text>
        </Pressable>
        <Pressable onPress={onSell} className="flex-1 items-center py-3 rounded-xl bg-rose-600 active:bg-rose-700">
          <Text className="text-white font-semibold">Sell / NO</Text>
        </Pressable>
      </View>
    </View>
  );
};

/* ---------- Screen ---------- */
type Mode = "Trending" | "Breaking" | "24h" | "New";
const CATS: (Category | "All")[] = ["All", "Sports", "Politics", "Crypto", "Entertainment"];

export default function TrendingScreen() {
  const [mode, setMode] = useState<Mode>("Trending");
  const [cat, setCat] = useState<(Category | "All")>("All");
  const [data, setData] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setData(MOCK);
      setLoading(false);
    }, 350);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...data];
    if (cat !== "All") list = list.filter((m) => m.category === cat);
    switch (mode) {
      case "Trending":
        return list.sort((a, b) => b.volume24h * Math.abs(b.change24h) - a.volume24h * Math.abs(a.change24h));
      case "Breaking":
        return list.filter((m) => m.breaking || m.endsAt - Date.now() <= 24 * 60 * 60 * 1000);
      case "24h":
        return list.filter((m) => m.endsAt - Date.now() <= 24 * 60 * 60 * 1000).sort((a, b) => a.endsAt - b.endsAt);
      case "New":
        return list.sort((a, b) => b.createdAt - a.createdAt);
      default:
        return list;
    }
  }, [data, mode, cat]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  const Header = (
    <View className="px-4 pt-2 pb-3 bg-zinc-50 dark:bg-black">
      <Text className="text-[22px] font-extrabold text-zinc-900 dark:text-zinc-50">⚡ Trending & Breaking</Text>
      <Text className="text-[12px] text-zinc-600 dark:text-zinc-300 mt-1">
        Marchés chauds, fins proches, volumes élevés.
      </Text>

      {/* modes */}
      <View className="flex-row gap-2 mt-3">
        {(["Trending", "Breaking", "24h", "New"] as Mode[]).map((m) => (
          <SegButton key={m} label={m} active={m === mode} onPress={() => setMode(m)} />
        ))}
      </View>

      {/* categories */}
      <View className="flex-row flex-wrap gap-2 mt-3">
        {CATS.map((c) => (
          <Chip key={c} label={c} active={c === cat} onPress={() => setCat(c)} />
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-zinc-50 dark:bg-black">
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={Header}
          contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <MarketCard
              m={item}
              onBuy={() => console.log("Buy YES", item.id)}
              onSell={() => console.log("Sell / NO", item.id)}
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  );
}
