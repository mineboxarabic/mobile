export type BetStatus = 'active' | 'won' | 'lost' | 'refunded' | 'pending';

export interface Bet {
  id: number;
  user_id: number;
  outcome_id: number;
  potential_return: number;
  percentage: number;
  stake: number;
  placed_at: Date;
  status: BetStatus;
  // Related data
  outcome?: {
    id: number;
    market_id: number;
    pourcentage: number;
    code: string;
    name: string | null;
  };
  market?: {
    id: number;
    name: string;
    category: string;
    status: string;
  };
  user?: {
    id: number;
    firstname: string;
    lastname: string;
  };
}

export interface BetPosition {
  market_id: number;
  outcome_id: number;
  total_stake: number;
  average_percentage: number;
  potential_return: number;
  bet_count: number;
}

export interface UserBetHistory {
  bet: Bet;
  market: {
    id: number;
    name: string;
    category: string;
    status: string;
  };
  outcome?: {
    won: boolean;
    payout: number;
  };
}