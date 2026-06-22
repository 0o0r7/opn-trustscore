export interface TrustScoreResult {
  overallScore: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskColor: string;
  categories: ScoreCategories;
  explanation: string;
  recommendations: string[];
  badges: Badge[];
  walletInfo: WalletInfo;
  analyzedAt: string;
  isFallbackMode: boolean;
}

export interface ScoreCategories {
  walletAge: CategoryScore;
  activityConsistency: CategoryScore;
  transactionHistory: CategoryScore;
  ecosystemParticipation: CategoryScore;
  builderReputation: CategoryScore;
  credentialOwnership: CategoryScore;
  defiParticipation: CategoryScore;
}

export interface CategoryScore {
  score: number;
  maxScore: number;
  weight: number;
  label: string;
  description: string;
  details: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface WalletInfo {
  address: string;
  formattedAddress: string;
  balance?: string;
  transactionCount?: number;
  firstTransactionDate?: string;
  lastTransactionDate?: string;
  ageInDays?: number;
}

export interface OPNChainConfig {
  id: number;
  name: string;
  network: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: {
    default: { http: string[] };
    public: { http: string[] };
  };
  blockExplorers: {
    default: { name: string; url: string };
  };
  testnet: boolean;
}
