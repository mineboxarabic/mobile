import { TextProps as RNTextProps } from 'react-native';
import { ReactNode } from 'react';

export type TextVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'small';
export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
export type TextColor = 'default' | 'muted' | 'light' | 'primary' | 'success' | 'warning' | 'danger' | 'white';

export interface TextProps extends RNTextProps {
  children: ReactNode;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  className?: string;
}
