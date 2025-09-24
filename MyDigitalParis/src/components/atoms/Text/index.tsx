import React from 'react';
import { Text as RNText } from 'react-native';
import { TextProps } from './types';

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  weight = 'normal',
  color = 'default',
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'h1':
        return 'text-3xl';
      case 'h2':
        return 'text-2xl';
      case 'h3':
        return 'text-xl';
      case 'h4':
        return 'text-lg';
      case 'body':
        return 'text-base';
      case 'caption':
        return 'text-sm';
      case 'small':
        return 'text-xs';
      default:
        return 'text-base';
    }
  };

  const getWeightStyles = () => {
    switch (weight) {
      case 'light':
        return 'font-light';
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'semibold':
        return 'font-semibold';
      case 'bold':
        return 'font-bold';
      default:
        return 'font-normal';
    }
  };

  const getColorStyles = () => {
    switch (color) {
      case 'default':
        return 'text-gray-900';
      case 'muted':
        return 'text-gray-600';
      case 'light':
        return 'text-gray-400';
      case 'primary':
        return 'text-blue-500';
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'danger':
        return 'text-red-500';
      case 'white':
        return 'text-white';
      default:
        return 'text-gray-900';
    }
  };

  const textStyles = `${getVariantStyles()} ${getWeightStyles()} ${getColorStyles()} ${className}`;

  return (
    <RNText className={textStyles} {...props}>
      {children}
    </RNText>
  );
};
