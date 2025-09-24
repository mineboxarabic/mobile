import { TextInputProps } from 'react-native';

export interface SearchBarProps extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
  showClearButton?: boolean;
  className?: string;
}
