import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SpinnerProps } from './types';

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'small',
  color = '#3B82F6',
  className = '',
  ...props
}) => {
  return (
    <View className={`items-center justify-center ${className}`} {...props}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};
