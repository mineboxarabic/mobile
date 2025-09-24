import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 active:bg-blue-600';
      case 'secondary':
        return 'bg-gray-200 active:bg-gray-300';
      case 'outline':
        return 'border-2 border-blue-500 bg-transparent active:bg-blue-50';
      case 'ghost':
        return 'bg-transparent active:bg-gray-100';
      case 'danger':
        return 'bg-red-500 active:bg-red-600';
      default:
        return 'bg-blue-500 active:bg-blue-600';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return 'px-3 py-2 rounded-md';
      case 'medium':
        return 'px-4 py-3 rounded-lg';
      case 'large':
        return 'px-6 py-4 rounded-xl';
      default:
        return 'px-4 py-3 rounded-lg';
    }
  };

  const getTextStyles = () => {
    const baseStyles = 'font-semibold text-center';
    const sizeStyles = size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';
    
    const colorStyles =
      variant === 'secondary' ? 'text-gray-800' :
      variant === 'outline' ? 'text-blue-500' :
      variant === 'ghost' ? 'text-gray-700' :
      'text-white';
    
    return `${baseStyles} ${sizeStyles} ${colorStyles}`;
  };

  const disabledStyles = disabled ? 'opacity-50' : '';
  const buttonStyles = `${getVariantStyles()} ${getSizeStyles()} ${disabledStyles} ${className}`;

  return (
    <TouchableOpacity
      className={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' || variant === 'danger' ? 'white' : '#3B82F6'} 
        />
      ) : (
        <Text className={getTextStyles()}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};
