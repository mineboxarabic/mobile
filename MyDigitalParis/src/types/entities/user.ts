export interface User {
  id: number;
  balance: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string; // Optional for client-side use
  bets_won: number;
  profit: number;
  // Computed fields for UI
  username?: string; // firstname + lastname
  avatar?: string; // Can be added later
  rank?: number; // Computed from profit ranking
  totalBets?: number; // Count from bets table
  winRate?: number; // bets_won / totalBets * 100
}

export interface UserStats {
  profit: number;
  bets_won: number;
  total_bets: number;
  win_rate: number;
  current_balance: number;
}