import { TextInputProps } from 'react-native';

export type InputVariant = 'default' | 'search' | 'outline' | 'filled';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  variant?: InputVariant;
  size?: InputSize;
  className?: string;
}
