import { Market, User, Category, MarketStatus, MarketType, Outcome } from '../../types/entities';

export const mockUsers: User[] = [
  {
    id: 1,
    balance: 1000,
    firstname: 'Alice',
    lastname: 'Martin',
    email: 'alice.martin@email.com',
    bets_won: 2,
    profit: 150.25,
    username: 'Alice Martin',
    rank: 1,
    totalBets: 3,
    winRate: 66.67,
    avatar: 'https://i.pravatar.cc/100?img=1'
  },
  {
    id: 2,
    balance: 750.5,
    firstname: 'Bob',
    lastname: 'Dupont',
    email: 'bob.dupont@email.com',
    bets_won: 1,
    profit: -50,
    username: 'Bob Dupont',
    rank: 2,
    totalBets: 3,
    winRate: 33.33,
    avatar: 'https://i.pravatar.cc/100?img=2'
  },
  {
    id: 3,
    balance: 1200,
    firstname: 'Claire',
    lastname: 'Bernard',
    email: 'claire.bernard@email.com',
    bets_won: 3,
    profit: 275.8,
    username: 'Claire Bernard',
    rank: 3,
    totalBets: 3,
    winRate: 100,
    avatar: 'https://i.pravatar.cc/100?img=3'
  },
  {
    id: 8,
    balance: 1300.5,
    firstname: 'Hugo',
    lastname: 'Durand',
    email: 'hugo.durand@email.com',
    bets_won: 4,
    profit: 420.75,
    username: 'Hugo Durand',
    rank: 4,
    totalBets: 3,
    winRate: 133.33,
    avatar: 'https://i.pravatar.cc/100?img=8'
  }
];

export const mockMarkets: Market[] = [
  {
    id: 1,
    user_id: 1,
    name: 'Qui remportera les élections présidentielles françaises 2027 ?',
    status: 'active',
    type: 'multiple',
    category: 'politique',
    desciption: 'Prédiction sur le vainqueur des prochaines élections présidentielles en France',
    popularity: 5,
    created_at: new Date('2025-01-15T10:00:00'),
    ended_at: new Date('2027-04-15T20:00:00'),
    creator: {
      id: 1,
      firstname: 'Alice',
      lastname: 'Martin',
      email: 'alice.martin@email.com'
    },
    outcomes: [
      {
        id: 1,
        market_id: 1,
        pourcentage: 35.5,
        code: 'MACRON',
        name: 'Emmanuel Macron',
        odds: 2.82
      },
      {
        id: 2,
        market_id: 1,
        pourcentage: 28.2,
        code: 'LE_PEN',
        name: 'Marine Le Pen',
        odds: 3.55
      },
      {
        id: 3,
        market_id: 1,
        pourcentage: 18.7,
        code: 'MELENCHON',
        name: 'Jean-Luc Mélenchon',
        odds: 5.35
      },
      {
        id: 4,
        market_id: 1,
        pourcentage: 12.3,
        code: 'OTHER',
        name: 'Autre candidat',
        odds: 8.13
      }
    ],
    totalVolume: 1200,
    participantCount: 8,
    trending: true
  },
  {
    id: 7,
    user_id: 7,
    name: 'Le Bitcoin dépassera-t-il 150 000$ en 2025 ?',
    status: 'active',
    type: 'binary',
    category: 'economie',
    desciption: 'Prédiction sur le prix du Bitcoin atteignant 150 000 dollars',
    popularity: 2,
    created_at: new Date('2025-01-01T00:00:00'),
    ended_at: new Date('2025-12-31T23:59:59'),
    creator: {
      id: 7,
      firstname: 'Gabrielle',
      lastname: 'Richard',
      email: 'gabrielle.richard@email.com'
    },
    outcomes: [
      {
        id: 23,
        market_id: 7,
        pourcentage: 67.3,
        code: 'YES',
        name: null,
        odds: 1.49
      },
      {
        id: 24,
        market_id: 7,
        pourcentage: 32.7,
        code: 'NO',
        name: null,
        odds: 3.06
      }
    ],
    totalVolume: 200,
    participantCount: 2,
    trending: true
  },
  {
    id: 4,
    user_id: 9,
    name: 'Qui remportera la Coupe du Monde 2026 ?',
    status: 'active',
    type: 'multiple',
    category: 'sport',
    desciption: 'Prédiction sur le vainqueur de la prochaine Coupe du Monde de football',
    popularity: 6,
    created_at: new Date('2025-01-10T08:00:00'),
    ended_at: new Date('2026-07-19T20:00:00'),
    creator: {
      id: 9,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com'
    },
    outcomes: [
      {
        id: 10,
        market_id: 4,
        pourcentage: 22.1,
        code: 'FRANCE',
        name: 'France',
        odds: 4.52
      },
      {
        id: 11,
        market_id: 4,
        pourcentage: 18.7,
        code: 'BRAZIL',
        name: 'Brésil',
        odds: 5.35
      },
      {
        id: 12,
        market_id: 4,
        pourcentage: 15.3,
        code: 'ARGENTINA',
        name: 'Argentine',
        odds: 6.54
      },
      {
        id: 13,
        market_id: 4,
        pourcentage: 12.8,
        code: 'GERMANY',
        name: 'Allemagne',
        odds: 7.81
      },
      {
        id: 15,
        market_id: 4,
        pourcentage: 21.7,
        code: 'OTHER',
        name: 'Autre équipe',
        odds: 4.61
      }
    ],
    totalVolume: 600,
    participantCount: 4,
    trending: false
  },
  {
    id: 10,
    user_id: 2,
    name: 'ChatGPT dépassera-t-il 3 milliards d\'utilisateurs en 2025 ?',
    status: 'active',
    type: 'binary',
    category: 'technologie',
    desciption: 'Prédiction sur le nombre d\'utilisateurs de ChatGPT',
    popularity: 0,
    created_at: new Date('2025-01-20T11:00:00'),
    ended_at: new Date('2025-12-31T23:59:59'),
    creator: {
      id: 2,
      firstname: 'Bob',
      lastname: 'Dupont',
      email: 'bob.dupont@email.com'
    },
    outcomes: [
      {
        id: 29,
        market_id: 10,
        pourcentage: 38.9,
        code: 'YES',
        name: null,
        odds: 2.57
      },
      {
        id: 30,
        market_id: 10,
        pourcentage: 61.1,
        code: 'NO',
        name: null,
        odds: 1.64
      }
    ],
    totalVolume: 100,
    participantCount: 1,
    trending: false
  },
  {
    id: 12,
    user_id: 9,
    name: 'La France légalisera-t-elle le cannabis récréatif en 2025 ?',
    status: 'active',
    type: 'binary',
    category: 'societe',
    desciption: 'Prédiction sur la légalisation du cannabis récréatif en France',
    popularity: 0,
    created_at: new Date('2025-01-25T15:30:00'),
    ended_at: new Date('2025-12-31T23:59:59'),
    creator: {
      id: 9,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com'
    },
    outcomes: [
      {
        id: 33,
        market_id: 12,
        pourcentage: 31.4,
        code: 'YES',
        name: null,
        odds: 3.18
      },
      {
        id: 34,
        market_id: 12,
        pourcentage: 68.6,
        code: 'NO',
        name: null,
        odds: 1.46
      }
    ],
    totalVolume: 100,
    participantCount: 1,
    trending: false
  },
  {
    id: 14,
    user_id: 9,
    name: 'Match de Football PSG vs OM',
    status: 'active',
    type: 'binary',
    category: 'sports',
    desciption: 'Prédiction du vainqueur du match',
    popularity: 0,
    created_at: new Date('2025-09-23T14:46:02'),
    ended_at: new Date('2024-02-15T19:00:00'), // Note: This seems to be a past date in SQL
    creator: {
      id: 9,
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com'
    },
    outcomes: [
      {
        id: 37,
        market_id: 14,
        pourcentage: 60,
        code: 'WIN_PSG',
        name: 'PSG gagne',
        odds: 1.67
      },
      {
        id: 38,
        market_id: 14,
        pourcentage: 40,
        code: 'WIN_OM',
        name: 'OM gagne',
        odds: 2.5
      }
    ],
    totalVolume: 100,
    participantCount: 1,
    trending: false
  }
];

export const categoryLabels: Record<Category, string> = {
  politique: 'Politique',
  sport: 'Sport',
  sports: 'Sports',
  economie: 'Économie',
  technologie: 'Technologie',
  societe: 'Société'
};

export const statusLabels: Record<MarketStatus, string> = {
  active: 'Actif',
  resolved: 'Résolu',
  disputed: 'Contesté',
  cancelled: 'Annulé'
};

// Fonction utilitaire pour rechercher dans les marchés
export const searchMarkets = (
  query: string,
  markets: Market[] = mockMarkets,
  categories: Category[] = [],
  statuses: MarketStatus[] = [],
  sortBy: 'newest' | 'ending_soon' | 'popular' | 'volume' = 'newest'
): Market[] => {
  let filtered = markets;

  // Filtrage par recherche textuelle
  if (query.trim()) {
    const searchTerms = query.toLowerCase().split(' ');
    filtered = filtered.filter(market => 
      searchTerms.every(term => 
        market.name.toLowerCase().includes(term) ||
        market.desciption?.toLowerCase().includes(term) ||
        categoryLabels[market.category].toLowerCase().includes(term) ||
        market.outcomes.some(outcome => 
          outcome.name?.toLowerCase().includes(term) ||
          outcome.code.toLowerCase().includes(term)
        )
      )
    );
  }

  // Filtrage par catégories
  if (categories.length > 0) {
    filtered = filtered.filter(market => categories.includes(market.category));
  }

  // Filtrage par statuts
  if (statuses.length > 0) {
    filtered = filtered.filter(market => statuses.includes(market.status));
  }

  // Tri
  switch (sortBy) {
    case 'newest':
      filtered.sort((a, b) => b.created_at.getTime() - a.created_at.getTime());
      break;
    case 'ending_soon':
      filtered.sort((a, b) => {
        const aEndTime = a.ended_at?.getTime() || Infinity;
        const bEndTime = b.ended_at?.getTime() || Infinity;
        return aEndTime - bEndTime;
      });
      break;
    case 'popular':
      filtered.sort((a, b) => (b.participantCount || 0) - (a.participantCount || 0));
      break;
    case 'volume':
      filtered.sort((a, b) => (b.totalVolume || 0) - (a.totalVolume || 0));
      break;
  }

  return filtered;
};