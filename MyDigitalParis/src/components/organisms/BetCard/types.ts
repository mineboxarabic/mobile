import { TouchableOpacityProps } from 'react-native';
import { Market } from '../../../types/entities';

export interface BetCardProps extends TouchableOpacityProps {
  market: Market;
  onBetPress?: (market: Market) => void;
  showQuickBet?: boolean;
  className?: string;
}
