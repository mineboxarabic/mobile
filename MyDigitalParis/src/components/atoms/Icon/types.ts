import { ViewProps } from 'react-native';

export interface IconProps extends ViewProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}
