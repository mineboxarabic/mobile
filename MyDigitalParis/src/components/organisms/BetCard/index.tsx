import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from '../../atoms/Text';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { BetCardProps } from './types';
import { categoryLabels } from '../../../assets/data/mock-data';

export const BetCard: React.FC<BetCardProps> = ({
  market,
  onPress,
  onBetPress,
  showQuickBet = true,
  className = '',
  ...props
}) => {
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  const formatTimeRemaining = (endedAt: Date | null): string => {
    if (!endedAt) return 'Pas de limite';
    
    const now = new Date();
    const diff = endedAt.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expiré';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}j ${hours}h`;
    if (hours > 0) return `${hours}h`;
    
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${minutes}min`;
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      sports: 'sports',
      politics: 'politics',
      crypto: 'crypto',
      entertainment: 'entertainment',
      technology: 'technology',
      other: 'other'
    };
    return icons[category] || 'other';
  };

  const cardStyles = `bg-white rounded-xl border border-gray-200 shadow-sm ${className}`;

  return (
    <TouchableOpacity
      className={cardStyles}
      onPress={onPress}
      activeOpacity={0.7}
      {...props}
    >
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1 mr-3">
            <View className="flex-row items-center mb-2">
              <Icon 
                name={getCategoryIcon(market.category)} 
                size={16} 
                color="#6B7280" 
                className="mr-2"
              />
              <Text variant="caption" color="muted" weight="medium">
                {categoryLabels[market.category] || market.category}
              </Text>
              {market.trending && (
                <View className="ml-2 flex-row items-center">
                  <Icon name="trending" size={14} color="#EF4444" />
                </View>
              )}
            </View>
            
            <Text variant="body" weight="semibold" className="leading-5">
              {market.name}
            </Text>
          </View>
          
          {market.imageUrl && (
            <Image
              source={{ uri: market.imageUrl }}
              className="w-12 h-12 rounded-lg"
              resizeMode="cover"
            />
          )}
        </View>

        {/* Options */}
        <View className="mb-4">
          {market.type === 'binary' ? (
            <View className="flex-row space-x-2">
              {market.outcomes.map((outcome) => (
                <View key={outcome.id} className="flex-1">
                  <View className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <Text variant="caption" color="muted" className="mb-1">
                      {outcome.name || (outcome.code === 'YES' ? 'Oui' : outcome.code === 'NO' ? 'Non' : outcome.code)}
                    </Text>
                    <Text variant="body" weight="bold" color="primary">
                      {outcome.odds?.toFixed(2) || (1 / (outcome.pourcentage / 100)).toFixed(2)}x
                    </Text>
                    <Text variant="small" color="muted">
                      {outcome.pourcentage.toFixed(1)}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View className="space-y-2">
              {market.outcomes.slice(0, 3).map((outcome) => (
                <View key={outcome.id} className="flex-row items-center justify-between bg-gray-50 rounded-lg p-2">
                  <Text variant="caption" className="flex-1">
                    {outcome.name || outcome.code}
                  </Text>
                  <Text variant="caption" weight="semibold" color="primary">
                    {outcome.odds?.toFixed(1) || (1 / (outcome.pourcentage / 100)).toFixed(1)}x
                  </Text>
                </View>
              ))}
              {market.outcomes.length > 3 && (
                <Text variant="small" color="muted" className="text-center">
                  +{market.outcomes.length - 3} autres options
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Stats */}
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center space-x-4">
            <View className="flex-row items-center">
              <Icon name="volume" size={14} color="#6B7280" className="mr-1" />
              <Text variant="small" color="muted">
                {formatNumber(market.totalVolume || 0)}€
              </Text>
            </View>
            
            <View className="flex-row items-center">
              <Icon name="users" size={14} color="#6B7280" className="mr-1" />
              <Text variant="small" color="muted">
                {formatNumber(market.participantCount || 0)}
              </Text>
            </View>
          </View>
          
          <View className="flex-row items-center">
            <Icon name="clock" size={14} color="#6B7280" className="mr-1" />
            <Text variant="small" color="muted">
              {formatTimeRemaining(market.ended_at)}
            </Text>
          </View>
        </View>

        {/* Creator */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-6 h-6 rounded-full bg-gray-300 mr-2 items-center justify-center">
              <Icon name="user" size={12} color="#6B7280" />
            </View>
            <Text variant="small" color="muted">
              Par {market.creator?.firstname} {market.creator?.lastname}
            </Text>
          </View>

          {showQuickBet && onBetPress && (
            <Button
              title="Parier"
              size="small"
              variant="primary"
              onPress={() => onBetPress(market)}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
