import { TouchableOpacityProps } from 'react-native';

export type FilterVariant = 'default' | 'category' | 'status' | 'sort';

export interface FilterButtonProps extends TouchableOpacityProps {
  title: string;
  isActive?: boolean;
  count?: number;
  icon?: string;
  variant?: FilterVariant;
  className?: string;
}
