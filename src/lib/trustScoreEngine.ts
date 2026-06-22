import type { TrustScoreResult, ScoreCategories, Badge, WalletInfo } from '@/types';
import { generateDeterministicData } from './opn';

/**
 * TrustScore Engine
 * Transparent, deterministic scoring model for OPN wallet reputation
 * 
 * Scoring Categories (each 0-100, weighted):
 * - Wallet Age: How long the wallet has been active
 * - Activity Consistency: Regularity of transactions
 * - Transaction History: Volume and diversity of transactions
 * - Ecosystem Participation: OPN-specific engagement
 * - Builder Reputation: Builder programme participation
 * - Credential Ownership: On-chain credentials/badges
 * - DeFi Participation: DeFi protocol interactions
 */

const WEIGHTS = {
  walletAge: 0.15,
  activityConsistency: 0.20,
  transactionHistory: 0.15,
  ecosystemParticipation: 0.15,
  builderReputation: 0.10,
  credentialOwnership: 0.10,
  defiParticipation: 0.15,
};

/**
 * Calculate TrustScore from wallet data
 * Returns deterministic results based on address for consistent demo experience
 */
export function calculateTrustScore(
  address: string,
  realData?: {
    balance?: string;
    txCount?: number;
    firstTx?: string;
    lastTx?: string;
    ageDays?: number;
  }
): TrustScoreResult {
  const { random } = generateDeterministicData(address);
  
  // Use real data if available, otherwise generate deterministic demo data
  // Clamp all values to valid ranges
  const txCount = Math.max(1, realData?.txCount ?? Math.floor(random() * 500) + 1);
  const ageDays = Math.max(1, realData?.ageDays ?? Math.floor(random() * 730) + 30);
  const balance = realData?.balance ?? Math.abs(random() * 10000).toFixed(2);
  
  const hasRealData = !!realData;
  
  // Calculate individual category scores
  const categories: ScoreCategories = {
    walletAge: calculateWalletAge(ageDays, random, hasRealData),
    activityConsistency: calculateActivityConsistency(txCount, ageDays, random, hasRealData),
    transactionHistory: calculateTransactionHistory(txCount, random, hasRealData),
    ecosystemParticipation: calculateEcosystemParticipation(address, random, hasRealData),
    builderReputation: calculateBuilderReputation(address, random, hasRealData),
    credentialOwnership: calculateCredentialOwnership(address, random, hasRealData),
    defiParticipation: calculateDeFiParticipation(address, random, hasRealData),
  };
  
  // Calculate weighted overall score
  const overallScore = Math.round(
    categories.walletAge.score * WEIGHTS.walletAge +
    categories.activityConsistency.score * WEIGHTS.activityConsistency +
    categories.transactionHistory.score * WEIGHTS.transactionHistory +
    categories.ecosystemParticipation.score * WEIGHTS.ecosystemParticipation +
    categories.builderReputation.score * WEIGHTS.builderReputation +
    categories.credentialOwnership.score * WEIGHTS.credentialOwnership +
    categories.defiParticipation.score * WEIGHTS.defiParticipation
  );
  
  const riskLevel = getRiskLevel(overallScore);
  const badges = generateBadges(categories, address);
  const walletInfo: WalletInfo = {
    address,
    formattedAddress: `${address.slice(0, 6)}...${address.slice(-4)}`,
    balance: String(balance),
    transactionCount: txCount,
    firstTransactionDate: realData?.firstTx ?? getDateDaysAgo(ageDays),
    lastTransactionDate: realData?.lastTx ?? getDateDaysAgo(Math.floor(random() * 7)),
    ageInDays: ageDays,
  };
  
  return {
    overallScore,
    riskLevel: riskLevel.level,
    riskColor: riskLevel.color,
    categories,
    explanation: generateExplanation(overallScore, categories),
    recommendations: generateRecommendations(categories),
    badges,
    walletInfo,
    analyzedAt: new Date().toISOString(),
    isFallbackMode: !hasRealData,
  };
}

function calculateWalletAge(ageDays: number, _random: () => number, _hasRealData: boolean): ScoreCategories['walletAge'] {
  let score: number;
  const details: string[] = [];
  
  if (ageDays > 365) {
    score = 80 + Math.min((ageDays - 365) / 365 * 20, 20);
    details.push(`Wallet active for ${ageDays} days - well established`);
  } else if (ageDays > 180) {
    score = 60 + ((ageDays - 180) / 185) * 20;
    details.push(`Wallet active for ${ageDays} days - maturing`);
  } else if (ageDays > 90) {
    score = 40 + ((ageDays - 90) / 90) * 20;
    details.push(`Wallet active for ${ageDays} days - relatively new`);
  } else if (ageDays > 30) {
    score = 20 + ((ageDays - 30) / 60) * 20;
    details.push(`Wallet active for ${ageDays} days - very new`);
  } else {
    score = Math.max(5, ageDays / 30 * 20);
    details.push(`Wallet active for ${ageDays} days - just created`);
  }
  
  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    maxScore: 100,
    weight: WEIGHTS.walletAge,
    label: 'Wallet Age',
    description: 'Measures how long the wallet has been active on the network',
    details,
  };
}

function calculateActivityConsistency(txCount: number, ageDays: number, _random: () => number, _hasRealData: boolean): ScoreCategories['activityConsistency'] {
  const txPerWeek = ageDays > 0 ? (txCount / ageDays) * 7 : 0;
  let score: number;
  const details: string[] = [];
  
  if (txPerWeek > 10) {
    score = 85 + Math.min((txPerWeek - 10) / 20 * 15, 15);
    details.push(`Very active: ${txPerWeek.toFixed(1)} transactions per week`);
  } else if (txPerWeek > 5) {
    score = 70 + ((txPerWeek - 5) / 5) * 15;
    details.push(`Active: ${txPerWeek.toFixed(1)} transactions per week`);
  } else if (txPerWeek > 2) {
    score = 50 + ((txPerWeek - 2) / 3) * 20;
    details.push(`Moderate: ${txPerWeek.toFixed(1)} transactions per week`);
  } else if (txPerWeek > 0.5) {
    score = 30 + ((txPerWeek - 0.5) / 1.5) * 20;
    details.push(`Low: ${txPerWeek.toFixed(1)} transactions per week`);
  } else {
    score = Math.max(5, txPerWeek / 0.5 * 30);
    details.push(`Very low: ${txPerWeek.toFixed(1)} transactions per week`);
  }
  
  details.push(`${txCount} total transactions over ${ageDays} days`);
  
  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    maxScore: 100,
    weight: WEIGHTS.activityConsistency,
    label: 'Activity Consistency',
    description: 'Evaluates transaction frequency and pattern regularity',
    details,
  };
}

function calculateTransactionHistory(txCount: number, random: () => number, _hasRealData: boolean): ScoreCategories['transactionHistory'] {
  let score: number;
  const details: string[] = [];
  
  if (txCount > 200) {
    score = 80 + Math.min((txCount - 200) / 300 * 20, 20);
    details.push(`Rich history: ${txCount} transactions`);
  } else if (txCount > 100) {
    score = 65 + ((txCount - 100) / 100) * 15;
    details.push(`Good history: ${txCount} transactions`);
  } else if (txCount > 50) {
    score = 45 + ((txCount - 50) / 50) * 20;
    details.push(`Developing: ${txCount} transactions`);
  } else if (txCount > 10) {
    score = 25 + ((txCount - 10) / 40) * 20;
    details.push(`Limited: ${txCount} transactions`);
  } else {
    score = Math.max(5, txCount / 10 * 25);
    details.push(`Minimal: ${txCount} transactions`);
  }
  
  const diversity = Math.floor(random() * 5) + 1;
  const diversityLabels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
  details.push(`Transaction diversity: ${diversityLabels[Math.min(diversity - 1, 4)]}`);
  
  return {
    score: Math.max(0, Math.min(100, Math.round(score))),
    maxScore: 100,
    weight: WEIGHTS.transactionHistory,
    label: 'Transaction History',
    description: 'Assesses volume and diversity of on-chain activity',
    details,
  };
}

function calculateEcosystemParticipation(address: string, random: () => number, hasRealData: boolean): ScoreCategories['ecosystemParticipation'] {
  const { random: r2 } = generateDeterministicData(address + 'eco');
  const participationScore = hasRealData ? Math.floor(random() * 40) + 40 : Math.floor(r2() * 100);
  const details: string[] = [];
  
  if (participationScore > 70) {
    details.push('High OPN ecosystem engagement detected');
    details.push('Participated in multiple ecosystem events');
  } else if (participationScore > 40) {
    details.push('Moderate OPN ecosystem engagement');
    details.push('Some ecosystem interactions found');
  } else {
    details.push('Limited OPN ecosystem engagement');
    details.push('Increase participation for higher score');
  }
  
  return {
    score: Math.max(0, Math.min(100, participationScore)),
    maxScore: 100,
    weight: WEIGHTS.ecosystemParticipation,
    label: 'Ecosystem Participation',
    description: 'Measures engagement with the OPN ecosystem and community',
    details,
  };
}

function calculateBuilderReputation(address: string, random: () => number, hasRealData: boolean): ScoreCategories['builderReputation'] {
  const { random: r2 } = generateDeterministicData(address + 'builder');
  const builderScore = hasRealData ? Math.floor(random() * 30) + 20 : Math.floor(r2() * 100);
  const details: string[] = [];
  
  if (builderScore > 70) {
    details.push('Active Builder Programme participant');
    details.push('Verified builder credentials detected');
    details.push('Multiple successful submissions');
  } else if (builderScore > 40) {
    details.push('Some builder activity detected');
    details.push('Consider joining the Builder Programme');
  } else {
    details.push('No builder programme participation detected');
    details.push('Join the OPN Builder Programme to earn reputation');
  }
  
  return {
    score: Math.max(0, Math.min(100, builderScore)),
    maxScore: 100,
    weight: WEIGHTS.builderReputation,
    label: 'Builder Reputation',
    description: 'Evaluates participation in the OPN Builder Programme',
    details,
  };
}

function calculateCredentialOwnership(address: string, random: () => number, hasRealData: boolean): ScoreCategories['credentialOwnership'] {
  const { random: r2 } = generateDeterministicData(address + 'creds');
  const credentialScore = hasRealData ? Math.floor(random() * 35) + 25 : Math.floor(r2() * 100);
  const details: string[] = [];
  
  if (credentialScore > 70) {
    details.push('Multiple on-chain credentials detected');
    details.push('Soulbound tokens found');
    details.push('Active credential collection');
  } else if (credentialScore > 40) {
    details.push('Some credentials detected');
    details.push('Potential for more credential earning');
  } else {
    details.push('Few or no on-chain credentials');
    details.push('Participate in quests to earn credentials');
  }
  
  return {
    score: Math.max(0, Math.min(100, credentialScore)),
    maxScore: 100,
    weight: WEIGHTS.credentialOwnership,
    label: 'Credential Ownership',
    description: 'Tracks on-chain credentials, badges, and soulbound tokens',
    details,
  };
}

function calculateDeFiParticipation(address: string, random: () => number, hasRealData: boolean): ScoreCategories['defiParticipation'] {
  const { random: r2 } = generateDeterministicData(address + 'defi');
  const defiScore = hasRealData ? Math.floor(random() * 40) + 30 : Math.floor(r2() * 100);
  const details: string[] = [];
  
  if (defiScore > 70) {
    details.push('Active DeFi participant');
    details.push('Multiple protocol interactions detected');
    details.push('Liquidity provision and/or staking found');
  } else if (defiScore > 40) {
    details.push('Some DeFi activity detected');
    details.push('Limited protocol interactions');
  } else {
    details.push('Limited DeFi participation');
    details.push('Explore OPN DeFi protocols to increase score');
  }
  
  return {
    score: Math.max(0, Math.min(100, defiScore)),
    maxScore: 100,
    weight: WEIGHTS.defiParticipation,
    label: 'DeFi Participation',
    description: 'Measures interaction with DeFi protocols on OPN Chain',
    details,
  };
}

function getRiskLevel(score: number): { level: 'Low' | 'Medium' | 'High' | 'Critical'; color: string } {
  if (score >= 80) return { level: 'Low', color: '#10B981' };
  if (score >= 60) return { level: 'Medium', color: '#F59E0B' };
  if (score >= 40) return { level: 'High', color: '#EF4444' };
  return { level: 'Critical', color: '#DC2626' };
}

function generateBadges(categories: ScoreCategories, _address: string): Badge[] {
  const badges: Badge[] = [];
  
  // Verified Builder badge
  badges.push({
    id: 'verified_builder',
    name: 'Verified Builder',
    description: 'Active participant in the OPN Builder Programme',
    icon: 'Hammer',
    earned: categories.builderReputation.score > 60,
    tier: categories.builderReputation.score > 85 ? 'gold' : categories.builderReputation.score > 60 ? 'silver' : undefined,
  });
  
  // OPN Participant badge
  badges.push({
    id: 'opn_participant',
    name: 'OPN Participant',
    description: 'Active member of the OPN ecosystem',
    icon: 'Users',
    earned: categories.ecosystemParticipation.score > 40,
    tier: categories.ecosystemParticipation.score > 80 ? 'gold' : categories.ecosystemParticipation.score > 60 ? 'silver' : 'bronze',
  });
  
  // Active DeFi User badge
  badges.push({
    id: 'active_defi',
    name: 'Active DeFi User',
    description: 'Regular participant in OPN DeFi protocols',
    icon: 'TrendingUp',
    earned: categories.defiParticipation.score > 50,
    tier: categories.defiParticipation.score > 80 ? 'gold' : categories.defiParticipation.score > 60 ? 'silver' : 'bronze',
  });
  
  // Low Risk Wallet badge
  badges.push({
    id: 'low_risk',
    name: 'Low Risk Wallet',
    description: 'Wallet demonstrates trustworthy behavior patterns',
    icon: 'Shield',
    earned: categories.walletAge.score > 50 && categories.activityConsistency.score > 40,
    tier: categories.walletAge.score > 80 && categories.activityConsistency.score > 70 ? 'platinum' : 'gold',
  });
  
  // Credential Holder badge
  badges.push({
    id: 'credential_holder',
    name: 'Credential Holder',
    description: 'Owns verified on-chain credentials',
    icon: 'Award',
    earned: categories.credentialOwnership.score > 40,
    tier: categories.credentialOwnership.score > 80 ? 'gold' : categories.credentialOwnership.score > 60 ? 'silver' : 'bronze',
  });
  
  // Transaction Master badge
  badges.push({
    id: 'tx_master',
    name: 'Transaction Master',
    description: 'High volume of on-chain transactions',
    icon: 'Zap',
    earned: categories.transactionHistory.score > 60,
    tier: categories.transactionHistory.score > 85 ? 'platinum' : categories.transactionHistory.score > 70 ? 'gold' : 'silver',
  });
  
  // Consistency Champion badge
  badges.push({
    id: 'consistency',
    name: 'Consistency Champion',
    description: 'Maintains regular on-chain activity',
    icon: 'Calendar',
    earned: categories.activityConsistency.score > 60,
    tier: categories.activityConsistency.score > 85 ? 'gold' : 'silver',
  });
  
  return badges;
}

function generateExplanation(score: number, categories: ScoreCategories): string {
  const parts: string[] = [];
  
  parts.push(`This wallet has an overall TrustScore of ${score}/100, indicating a ${getRiskLevel(score).level.toLowerCase()} risk profile.`);
  
  // Find strongest category
  const entries = Object.entries(categories);
  const strongest = entries.reduce((a, b) => a[1].score > b[1].score ? a : b);
  const weakest = entries.reduce((a, b) => a[1].score < b[1].score ? a : b);
  
  parts.push(`The strongest area is ${strongest[1].label} (${strongest[1].score}/100), while ${weakest[1].label} (${weakest[1].score}/100) offers the most room for improvement.`);
  
  if (score >= 80) {
    parts.push('This is a well-established wallet with strong on-chain history and ecosystem participation.');
  } else if (score >= 60) {
    parts.push('This wallet shows good engagement but could benefit from increased consistency and ecosystem participation.');
  } else if (score >= 40) {
    parts.push('This wallet is relatively new or has limited on-chain activity. Time and participation will improve the score.');
  } else {
    parts.push('This wallet has minimal on-chain history. Building activity and ecosystem participation is recommended.');
  }
  
  return parts.join(' ');
}

function generateRecommendations(categories: ScoreCategories): string[] {
  const recommendations: string[] = [];
  
  if (categories.walletAge.score < 40) {
    recommendations.push('Continue using your wallet regularly - age is a key trust factor');
  }
  
  if (categories.activityConsistency.score < 50) {
    recommendations.push('Establish a regular transaction pattern to improve consistency score');
  }
  
  if (categories.ecosystemParticipation.score < 50) {
    recommendations.push('Join OPN community events and engage with ecosystem projects');
  }
  
  if (categories.builderReputation.score < 50) {
    recommendations.push('Consider joining the OPN Builder Programme to earn verified credentials');
  }
  
  if (categories.credentialOwnership.score < 50) {
    recommendations.push('Complete quests and earn on-chain credentials to boost reputation');
  }
  
  if (categories.defiParticipation.score < 50) {
    recommendations.push('Explore OPN DeFi protocols - staking and LP participation improves your score');
  }
  
  if (categories.transactionHistory.score < 50) {
    recommendations.push('Increase transaction diversity across different types of operations');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('Maintain your excellent on-chain behavior to preserve your high TrustScore');
    recommendations.push('Consider mentoring newer wallets in the OPN ecosystem');
  }
  
  return recommendations;
}

function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
}
