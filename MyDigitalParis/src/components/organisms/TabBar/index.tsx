import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { TabBarProps } from './types';

export const TabBar: React.FC<TabBarProps> = ({ state, descriptors, navigation }) => {
  const tabItems = [
    { name: 'Home', label: 'Accueil', icon: 'home' },
    { name: 'Search', label: 'Recherche', icon: 'search' },
    { name: 'CreateBet', label: 'Créer', icon: 'plus' },
    { name: 'Trending', label: 'Tendances', icon: 'trending' },
    { name: 'Profile', label: 'Profil', icon: 'user' },
  ];

  return (
    <View className="flex-row bg-white border-t border-gray-200 px-2 py-2 safe-area-bottom">
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined 
          ? options.tabBarLabel 
          : options.title !== undefined 
          ? options.title 
          : route.name;

        const isFocused = state.index === index;
        const tabItem = tabItems.find(item => item.name === route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center py-2"
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
          >
            <View className="items-center">
              <Icon 
                name={tabItem?.icon || 'default'}
                size={24}
                color={isFocused ? '#3B82F6' : '#6B7280'}
              />
              <Text 
                className={`text-xs mt-1 ${
                  isFocused ? 'text-blue-500 font-medium' : 'text-gray-500'
                }`}
                numberOfLines={1}
              >
                {tabItem?.label || label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
