import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon';
import { SearchBarProps } from './types';

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onClear,
  placeholder = 'Rechercher des marchés...',
  showClearButton = true,
  className = '',
  ...props
}) => {
  return (
    <View className={`relative ${className}`}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        variant="search"
        className="pr-12"
        {...props}
      />
      
      {/* Search Icon */}
      <View className="absolute left-4 top-1/2 -translate-y-1/2">
        <Icon name="search" size={20} color="#9CA3AF" />
      </View>
      
      {/* Clear Button */}
      {value && showClearButton && (
        <TouchableOpacity
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1"
          onPress={onClear}
        >
          <Icon name="close" size={16} color="#9CA3AF" />
        </TouchableOpacity>
      )}
    </View>
  );
};

