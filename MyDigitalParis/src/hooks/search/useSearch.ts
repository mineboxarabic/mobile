import { useState, useEffect, useMemo } from 'react';
import { useDebounce } from '../common/useDebounce';
import { Market, Category, MarketStatus, SearchFilters, SearchHistory } from '../../types/entities';
import { mockMarkets, searchMarkets } from '../../assets/data/mock-data';

export interface UseSearchResult {
  query: string;
  setQuery: (query: string) => void;
  results: Market[];
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  loading: boolean;
  searchHistory: SearchHistory[];
  clearHistory: () => void;
  isFiltered: boolean;
  resultCount: number;
}

export function useSearch(): UseSearchResult {
  const [query, setQuery] = useState('');
  const [filters, setFiltersState] = useState<SearchFilters>({
    categories: [],
    status: [],
    sortBy: 'newest',
    sortOrder: 'desc'
  });
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);

  // Debounce search query to avoid too many searches
  const debouncedQuery = useDebounce(query, 300);

  // Compute search results
  const results = useMemo(() => {
    setLoading(true);
    
    try {
      const filteredResults = searchMarkets(
        debouncedQuery,
        mockMarkets,
        filters.categories,
        filters.status,
        filters.sortBy
      );
      
      return filteredResults;
    } finally {
      setLoading(false);
    }
  }, [debouncedQuery, filters]);

  // Update search history when query changes
  useEffect(() => {
    if (debouncedQuery.trim() && debouncedQuery.length > 2) {
      const newHistoryItem: SearchHistory = {
        id: Date.now().toString(),
        query: debouncedQuery,
        timestamp: new Date(),
        filters: { ...filters }
      };

      setSearchHistory(prev => {
        // Remove duplicate and add to front
        const filtered = prev.filter(item => item.query !== debouncedQuery);
        return [newHistoryItem, ...filtered].slice(0, 10); // Keep only last 10 searches
      });
    }
  }, [debouncedQuery, filters]);

  const setFilters = (newFilters: Partial<SearchFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const clearHistory = () => {
    setSearchHistory([]);
  };

  const isFiltered = useMemo(() => {
    return (
      filters.categories.length > 0 ||
      filters.status.length > 0 ||
      filters.minVolume !== undefined ||
      filters.maxVolume !== undefined ||
      filters.type !== undefined
    );
  }, [filters]);

  return {
    query,
    setQuery,
    results,
    filters,
    setFilters,
    loading,
    searchHistory,
    clearHistory,
    isFiltered,
    resultCount: results.length
  };
}
