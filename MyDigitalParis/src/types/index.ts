// Database Types
export interface Bet {
  id: number;
  user_id: number;
  outcome_id: number;
  potential_return: number;
  pourcenatge: number;
  stake: number;
  placed_at: string;
  status: string | null;
}

export interface Market {
  id: number;
  user_id: number;
  name: string | null;
  status: string | null;
  type: string | null;
  category: string | null;
  desciption: string | null;
  popularity: number;
  created_at: string;
  ended_at: string | null;
}

export interface Outcome {
  id: number;
  market_id: number;
  pourcentage: number;
  code: string | null;
  name: string | null;
}

export interface OutcomeHistory {
  id: number;
  outcome_id: number;
  pourcentage: number;
  created_at: string;
}

export interface User {
  id: number;
  balance: number;
  firstname: string | null;
  lastname: string | null;
  email: string;
  password: string;
  bets_won: number;
  profit: number | null;
}