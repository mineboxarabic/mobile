import React from 'react';
import { View, Text } from 'react-native';
import { IconProps } from './types';

// Simple icon component using Unicode symbols
// In a real project, you'd use react-native-vector-icons or similar
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = '#000',
  className = '',
  ...props
}) => {
  const getIconSymbol = (iconName: string): string => {
    const icons: Record<string, string> = {
      // Search & Navigation
      'search': '🔍',
      'filter': '⚙️',
      'sort': '↕️',
      'close': '✕',
      'chevron-down': '▼',
      'chevron-up': '▲',
      'chevron-left': '◀',
      'chevron-right': '▶',
      'arrow-up': '↑',
      'arrow-down': '↓',
      
      // Actions
      'plus': '+',
      'minus': '-',
      'check': '✓',
      'cross': '✕',
      'heart': '♥',
      'star': '★',
      'bookmark': '🔖',
      'share': '📤',
      
      // Categories
      'sports': '⚽',
      'politics': '🏛️',
      'crypto': '₿',
      'entertainment': '🎬',
      'technology': '💻',
      'other': '📋',
      
      // Status
      'trending': '📈',
      'fire': '🔥',
      'clock': '⏰',
      'calendar': '📅',
      'user': '👤',
      'users': '👥',
      'volume': '📊',
      'money': '💰',
      
      // Default
      'default': '•'
    };
    
    return icons[iconName] || icons['default'];
  };

  const iconStyles = `text-center ${className}`;

  return (
    <View style={{ width: size, height: size }} className="items-center justify-center" {...props}>
      <Text 
        className={iconStyles}
        style={{ 
          fontSize: size * 0.8, 
          color,
          lineHeight: size
        }}
      >
        {getIconSymbol(name)}
      </Text>
    </View>
  );
};
