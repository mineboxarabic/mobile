import React from 'react';
import { TextInput, View, Text } from 'react-native';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'default',
  size = 'medium',
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'search':
        return 'border border-gray-300 bg-gray-50 rounded-full';
      case 'outline':
        return 'border border-gray-300 bg-white rounded-lg';
      case 'filled':
        return 'bg-gray-100 rounded-lg border-0';
      default:
        return 'border border-gray-300 bg-white rounded-lg';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 text-sm';
      case 'medium':
        return 'px-4 py-3 text-base';
      case 'large':
        return 'px-5 py-4 text-lg';
      default:
        return 'px-4 py-3 text-base';
    }
  };

  const errorStyles = error ? 'border-red-500' : '';
  const inputStyles = `${getVariantStyles()} ${getSizeStyles()} ${errorStyles} ${className}`;

  return (
    <View className="w-full">
      {label && (
        <Text className="text-gray-700 font-medium mb-2 text-sm">
          {label}
        </Text>
      )}
      <TextInput
        className={inputStyles}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className="text-red-500 text-xs mt-1">
          {error}
        </Text>
      )}
    </View>
  );
};
