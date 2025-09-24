import { useState, useMemo } from 'react';
import { Category, MarketStatus } from '../../types/entities';
import { categoryLabels, statusLabels } from '../../assets/data/mock-data';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  isActive: boolean;
}

export interface UseFiltersResult {
  categoryFilters: FilterOption[];
  statusFilters: FilterOption[];
  sortOptions: FilterOption[];
  toggleCategory: (category: Category) => void;
  toggleStatus: (status: MarketStatus) => void;
  setSortBy: (sortBy: string) => void;
  clearAllFilters: () => void;
  hasActiveFilters: boolean;
}

export function useFilters(
  activeCategories: Category[],
  activeStatuses: MarketStatus[],
  currentSort: string,
  onFiltersChange: (filters: {
    categories?: Category[];
    status?: MarketStatus[];
    sortBy?: 'newest' | 'ending_soon' | 'popular' | 'volume';
  }) => void
): UseFiltersResult {
  
  const categoryFilters: FilterOption[] = useMemo(() => {
    return Object.entries(categoryLabels).map(([value, label]) => ({
      value,
      label,
      isActive: activeCategories.includes(value as Category)
    }));
  }, [activeCategories]);

  const statusFilters: FilterOption[] = useMemo(() => {
    return Object.entries(statusLabels).map(([value, label]) => ({
      value,
      label,
      isActive: activeStatuses.includes(value as MarketStatus)
    }));
  }, [activeStatuses]);

  const sortOptions: FilterOption[] = useMemo(() => {
    return [
      { value: 'newest', label: 'Plus récent', isActive: currentSort === 'newest' },
      { value: 'ending_soon', label: 'Fin prochaine', isActive: currentSort === 'ending_soon' },
      { value: 'popular', label: 'Populaire', isActive: currentSort === 'popular' },
      { value: 'volume', label: 'Volume élevé', isActive: currentSort === 'volume' }
    ];
  }, [currentSort]);

  const toggleCategory = (category: Category) => {
    const newCategories = activeCategories.includes(category)
      ? activeCategories.filter(c => c !== category)
      : [...activeCategories, category];
    
    onFiltersChange({ categories: newCategories });
  };

  const toggleStatus = (status: MarketStatus) => {
    const newStatuses = activeStatuses.includes(status)
      ? activeStatuses.filter(s => s !== status)
      : [...activeStatuses, status];
    
    onFiltersChange({ status: newStatuses });
  };

  const setSortBy = (sortBy: string) => {
    onFiltersChange({ 
      sortBy: sortBy as 'newest' | 'ending_soon' | 'popular' | 'volume' 
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      status: [],
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = useMemo(() => {
    return activeCategories.length > 0 || activeStatuses.length > 0 || currentSort !== 'newest';
  }, [activeCategories, activeStatuses, currentSort]);

  return {
    categoryFilters,
    statusFilters,
    sortOptions,
    toggleCategory,
    toggleStatus,
    setSortBy,
    clearAllFilters,
    hasActiveFilters
  };
}
