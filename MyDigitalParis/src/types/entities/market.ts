export type MarketStatus = 'active' | 'resolved' | 'disputed' | 'cancelled';
export type MarketType = 'binary' | 'multiple';
export type Category = 'politique' | 'sport' | 'economie' | 'technologie' | 'societe' | 'sports';

export interface Outcome {
  id: number;
  market_id: number;
  pourcentage: number;
  code: string;
  name: string | null;
  // Computed fields
  odds?: number; // 1 / (pourcentage / 100)
  volume?: number; // Sum of stakes for this outcome
}

export interface OutcomeHistory {
  id: number;
  outcome_id: number;
  pourcentage: number;
  created_at: Date;
}

export interface Market {
  id: number;
  user_id: number;
  name: string;
  status: MarketStatus;
  type: MarketType;
  category: Category;
  desciption?: string; // Note: keeping SQL typo for consistency
  popularity: number;
  created_at: Date;
  ended_at: Date | null;
  // Related data
  creator?: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  };
  outcomes: Outcome[];
  // Computed fields for UI
  totalVolume?: number; // Sum of all stakes
  participantCount?: number; // Count of unique users with bets
  trending?: boolean; // Based on recent activity
  imageUrl?: string; // Can be added later
}

export interface SearchFilters {
  categories: Category[];
  status: MarketStatus[];
  type?: MarketType;
  minVolume?: number;
  maxVolume?: number;
  sortBy: 'newest' | 'ending_soon' | 'popular' | 'volume';
  sortOrder: 'asc' | 'desc';
}

export interface SearchHistory {
  id: string;
  query: string;
  timestamp: Date;
  filters?: Partial<SearchFilters>;
}