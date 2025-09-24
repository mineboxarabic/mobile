import { ViewProps } from 'react-native';

export interface SpinnerProps extends ViewProps {
  size?: 'small' | 'large';
  color?: string;
  className?: string;
}
