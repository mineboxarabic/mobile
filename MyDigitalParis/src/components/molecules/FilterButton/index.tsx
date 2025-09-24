import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';
import { FilterButtonProps } from './types';

export const FilterButton: React.FC<FilterButtonProps> = ({
  title,
  isActive = false,
  count,
  icon,
  variant = 'default',
  onPress,
  className = '',
  ...props
}) => {
  const getVariantStyles = () => {
    if (isActive) {
      switch (variant) {
        case 'category':
          return 'bg-blue-100 border-blue-300';
        case 'status':
          return 'bg-green-100 border-green-300';
        case 'sort':
          return 'bg-purple-100 border-purple-300';
        default:
          return 'bg-gray-100 border-gray-300';
      }
    }
    return 'bg-white border-gray-200';
  };

  const getTextColor = () => {
    if (isActive) {
      switch (variant) {
        case 'category':
          return 'text-blue-700';
        case 'status':
          return 'text-green-700';
        case 'sort':
          return 'text-purple-700';
        default:
          return 'text-gray-700';
      }
    }
    return 'text-gray-600';
  };

  const buttonStyles = `flex-row items-center px-3 py-2 rounded-full border ${getVariantStyles()} ${className}`;

  return (
    <TouchableOpacity
      className={buttonStyles}
      onPress={onPress}
      {...props}
    >
      {icon && (
        <Icon 
          name={icon} 
          size={16} 
          color={isActive ? (variant === 'category' ? '#1D4ED8' : variant === 'status' ? '#047857' : variant === 'sort' ? '#7C3AED' : '#374151') : '#6B7280'}
          className="mr-1"
        />
      )}
      
      <Text 
        variant="caption" 
        weight="medium"
        className={getTextColor()}
      >
        {title}
      </Text>
      
      {count !== undefined && count > 0 && (
        <View className="ml-1 bg-gray-500 rounded-full min-w-[18px] h-[18px] items-center justify-center">
          <Text variant="small" color="white" weight="medium">
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};