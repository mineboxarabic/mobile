import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  FlatList, 
  TouchableOpacity,
  Modal,
  RefreshControl 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import { SearchBar } from '../../../components/molecules/SearchBar';
import { FilterButton } from '../../../components/molecules/FilterButton';
import { BetCard } from '../../../components/organisms/BetCard';
import { Text } from '../../../components/atoms/Text';
import { Button } from '../../../components/atoms/Button';
import { Icon } from '../../../components/atoms/Icon';
import { Spinner } from '../../../components/atoms/Spinner';

// Hooks
import { useSearch } from '../../../hooks/search/useSearch';
import { useFilters } from '../../../hooks/search/useFilters';

// Types
import { Market } from '../../../types/entities';
import { SearchScreenProps } from './types';

export const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const {
    query,
    setQuery,
    results,
    filters,
    setFilters,
    loading,
    searchHistory,
    clearHistory,
    isFiltered,
    resultCount
  } = useSearch();

  const {
    categoryFilters,
    statusFilters,
    sortOptions,
    toggleCategory,
    toggleStatus,
    setSortBy,
    clearAllFilters,
    hasActiveFilters
  } = useFilters(
    filters.categories,
    filters.status,
    filters.sortBy,
    setFilters
  );

  const handleClearSearch = () => {
    setQuery('');
  };

  const handleBetPress = (market: Market) => {
    // Navigate to bet details or betting modal
    console.log('Bet on market:', market.id);
  };

  const handleMarketPress = (market: Market) => {
    // Navigate to market details
    console.log('View market:', market.id);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    // In a real app, this would refetch data from API
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderEmptyState = () => {
    if (loading) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <Spinner size="large" />
          <Text variant="body" color="muted" className="mt-4">
            Recherche en cours...
          </Text>
        </View>
      );
    }

    if (query.trim() && results.length === 0) {
      return (
        <View className="flex-1 items-center justify-center py-20">
          <Icon name="search" size={48} color="#D1D5DB" />
          <Text variant="h4" weight="semibold" className="mt-4 mb-2">
            Aucun résultat
          </Text>
          <Text variant="body" color="muted" className="text-center mx-8">
            Essayez de modifier vos termes de recherche ou vos filtres
          </Text>
          {hasActiveFilters && (
            <Button
              title="Effacer les filtres"
              variant="outline"
              onPress={clearAllFilters}
              className="mt-4"
            />
          )}
        </View>
      );
    }

    return (
      <View className="flex-1 py-8">
        <Text variant="h3" weight="bold" className="text-center mb-4">
          Découvrez les marchés
        </Text>
        <Text variant="body" color="muted" className="text-center mx-8 mb-8">
          Recherchez des marchés de prédiction par mots-clés, catégories ou utilisez les filtres
        </Text>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <View className="mx-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text variant="body" weight="semibold">
                Recherches récentes
              </Text>
              <TouchableOpacity onPress={clearHistory}>
                <Text variant="caption" color="primary">
                  Effacer
                </Text>
              </TouchableOpacity>
            </View>
            
            {searchHistory.slice(0, 5).map((item) => (
              <TouchableOpacity
                key={item.id}
                className="flex-row items-center py-2"
                onPress={() => setQuery(item.query)}
              >
                <Icon name="clock" size={16} color="#9CA3AF" className="mr-3" />
                <Text variant="body" className="flex-1">
                  {item.query}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  const renderFilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Text variant="body" color="primary" weight="medium">
              Annuler
            </Text>
          </TouchableOpacity>
          <Text variant="h4" weight="bold">
            Filtres
          </Text>
          <TouchableOpacity onPress={clearAllFilters}>
            <Text variant="body" color="primary" weight="medium">
              Réinitialiser
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Categories */}
          <View className="mb-6">
            <Text variant="body" weight="semibold" className="mb-3">
              Catégories
            </Text>
            <View className="flex-row flex-wrap">
              {categoryFilters.map((filter) => (
                <FilterButton
                  key={filter.value}
                  title={filter.label}
                  isActive={filter.isActive}
                  variant="category"
                  onPress={() => toggleCategory(filter.value as any)}
                  className="mr-2 mb-2"
                />
              ))}
            </View>
          </View>

          {/* Status */}
          <View className="mb-6">
            <Text variant="body" weight="semibold" className="mb-3">
              Statut
            </Text>
            <View className="flex-row flex-wrap">
              {statusFilters.map((filter) => (
                <FilterButton
                  key={filter.value}
                  title={filter.label}
                  isActive={filter.isActive}
                  variant="status"
                  onPress={() => toggleStatus(filter.value as any)}
                  className="mr-2 mb-2"
                />
              ))}
            </View>
          </View>

          {/* Sort */}
          <View className="mb-6">
            <Text variant="body" weight="semibold" className="mb-3">
              Trier par
            </Text>
            <View className="space-y-2">
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`flex-row items-center justify-between p-3 rounded-lg ${
                    option.isActive ? 'bg-blue-50' : 'bg-gray-50'
                  }`}
                  onPress={() => setSortBy(option.value)}
                >
                  <Text 
                    variant="body" 
                    color={option.isActive ? 'primary' : 'default'}
                    weight={option.isActive ? 'medium' : 'normal'}
                  >
                    {option.label}
                  </Text>
                  {option.isActive && (
                    <Icon name="check" size={16} color="#3B82F6" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View className="p-4 border-t border-gray-200">
          <Button
            title="Appliquer les filtres"
            onPress={() => setShowFilters(false)}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <SearchBar
          value={query}
          onChangeText={setQuery}
          onClear={handleClearSearch}
          placeholder="Rechercher des marchés..."
        />
        
        {/* Filter Bar */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mt-3"
          contentContainerStyle={{ paddingHorizontal: 0 }}
        >
          <TouchableOpacity
            className="mr-3"
            onPress={() => setShowFilters(true)}
          >
            <FilterButton
              title="Filtres"
              icon="filter"
              isActive={hasActiveFilters}
              count={hasActiveFilters ? (filters.categories.length + filters.status.length) : undefined}
            />
          </TouchableOpacity>

          {categoryFilters
            .filter(f => f.isActive)
            .map((filter) => (
              <FilterButton
                key={filter.value}
                title={filter.label}
                isActive={true}
                variant="category"
                onPress={() => toggleCategory(filter.value as any)}
                className="mr-2"
              />
            ))}
        </ScrollView>
      </View>

      {/* Results */}
      {query.trim() || isFiltered ? (
        <View className="flex-1">
          {/* Results Header */}
          <View className="bg-white px-4 py-3 border-b border-gray-100">
            <Text variant="body" color="muted">
              {loading ? 'Recherche...' : `${resultCount} résultat${resultCount !== 1 ? 's' : ''}`}
              {query.trim() && ` pour "${query}"`}
            </Text>
          </View>

          {/* Results List */}
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <BetCard
                market={item}
                onPress={() => handleMarketPress(item)}
                onBetPress={handleBetPress}
                className="mx-4 mb-3"
              />
            )}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={renderEmptyState}
          />
        </View>
      ) : (
        renderEmptyState()
      )}

      {renderFilterModal()}
    </SafeAreaView>
  );
};
