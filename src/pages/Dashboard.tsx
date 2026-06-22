import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { calculateTrustScore } from '@/lib/trustScoreEngine';
import { getAddressExplorerUrl, analyzeWallet } from '@/lib/opn';
import type { TrustScoreResult, AnalyzedWalletData } from '@/types';
import { useMemo, useState, useEffect } from 'react';
import {
  Shield,
  ArrowLeft,
  ExternalLink,
  Clock,
  Activity,
  TrendingUp,
  Users,
  Award,
  BadgeCheck,
  Wallet,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ChevronRight,
  Info,
  Share2,
  Loader2,
  Zap,
  Box,
  Hash
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

function CircularScore({ score, size = 140, strokeWidth = 8, color }: { 
  score: number; 
  size?: number; 
  strokeWidth?: number;
  color: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-xs text-gray-500">/100</span>
      </div>
    </div>
  );
}

function CategoryCard({ category, index }: { category: { score: number; maxScore: number; label: string; description: string; details: string[]; weight: number }; index: number }) {
  const icons: Record<string, React.ElementType> = {
    'Wallet Age': Clock,
    'Activity Consistency': Activity,
    'Transaction History': TrendingUp,
    'Ecosystem Participation': Users,
    'Builder Reputation': Award,
    'Credential Ownership': BadgeCheck,
    'DeFi Participation': Wallet,
  };
  
  const Icon = icons[category.label] || Shield;
  
  const getScoreColor = (s: number) => {
    if (s >= 80) return '#10B981';
    if (s >= 60) return '#3B82F6';
    if (s >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <motion.div
      custom={index}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="glass rounded-xl p-5 hover:bg-white/[0.07] transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{category.label}</h3>
            <p className="text-xs text-gray-500">Weight: {(category.weight * 100).toFixed(0)}%</p>
          </div>
        </div>
        <span className="text-lg font-bold" style={{ color: getScoreColor(category.score) }}>
          {category.score}
        </span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full h-2 rounded-full bg-white/5 mb-3">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ 
            width: `${category.score}%`, 
            background: `linear-gradient(90deg, ${getScoreColor(category.score)}88, ${getScoreColor(category.score)})` 
          }}
        />
      </div>
      
      <p className="text-xs text-gray-400 mb-2">{category.description}</p>
      <ul className="space-y-1">
        {category.details.slice(0, 2).map((detail, i) => (
          <li key={i} className="flex items-start gap-1.5 text-xs text-gray-500">
            <ChevronRight className="w-3 h-3 text-gray-600 flex-shrink-0 mt-0.5" />
            {detail}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function BadgeCard({ badge, index }: { badge: { id: string; name: string; description: string; earned: boolean; tier?: string; icon: string }; index: number }) {
  const tierColors = {
    bronze: 'from-orange-600 to-amber-600',
    silver: 'from-gray-400 to-gray-300',
    gold: 'from-yellow-500 to-amber-400',
    platinum: 'from-purple-500 to-pink-500',
  };

  return (
    <motion.div
      custom={index}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`glass rounded-xl p-4 flex items-center gap-3 transition-all ${
        badge.earned ? 'opacity-100' : 'opacity-40'
      }`}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        badge.earned && badge.tier
          ? `bg-gradient-to-br ${tierColors[badge.tier as keyof typeof tierColors]}`
          : 'bg-white/5'
      }`}>
        {badge.earned ? (
          <CheckCircle2 className="w-5 h-5 text-white" />
        ) : (
          <Shield className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-medium text-white">{badge.name}</h4>
          {badge.tier && badge.earned && (
            <span className="text-[10px] uppercase font-bold text-gray-500">{badge.tier}</span>
          )}
        </div>
        <p className="text-xs text-gray-500">{badge.description}</p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { address } = useParams<{ address: string }>();
  const [rpcData, setRpcData] = useState<AnalyzedWalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchWalletData() {
      if (!address) return;
      setIsLoading(true);
      try {
        const data = await analyzeWallet(address);
        setRpcData(data);
      } catch (err) {
        console.error('Failed to fetch wallet data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWalletData();
  }, [address]);
  
  const result: TrustScoreResult = useMemo(() => {
    if (!address) return null as unknown as TrustScoreResult;
    return calculateTrustScore(address, rpcData || undefined);
  }, [address, rpcData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#06060f] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Analyzing Wallet...</h2>
          <p className="text-gray-400">Fetching real-time OPN Chain data</p>
        </div>
      </div>
    );
  }

  if (!address || !result) {
    return (
      <div className="min-h-screen bg-[#06060f] text-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Invalid Address</h2>
          <Link to="/analyze">
            <Button className="mt-4 bg-purple-600 hover:bg-purple-500">
              Go to Analysis
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryEntries = Object.entries(result.categories);

  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Analysis
            </Link>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">TrustScore Dashboard</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-mono text-sm text-gray-400">{address}</span>
                  <a
                    href={getAddressExplorerUrl(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-purple-400 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
                  result.dataMode === 'REAL_OPN_DATA'
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-yellow-500/10 border border-yellow-500/20'
                }`}>
                  {result.dataMode === 'REAL_OPN_DATA' ? (
                    <>
                      <Zap className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400 font-bold">REAL OPN DATA</span>
                    </>
                  ) : (
                    <>
                      <Info className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-yellow-400 font-bold">FALLBACK DEMO MODE</span>
                    </>
                  )}
                </div>

                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${
                  result.rpcStatus === 'success'
                    ? 'bg-blue-500/10 border border-blue-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                }`}>
                  <Activity className={`w-4 h-4 ${result.rpcStatus === 'success' ? 'text-blue-400' : 'text-red-400'}`} />
                  <span className={`text-xs font-bold ${result.rpcStatus === 'success' ? 'text-blue-400' : 'text-red-400'}`}>
                    RPC: {result.rpcStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Score Card */}
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="glass-strong rounded-2xl p-6 sm:p-8 mb-6 gradient-border"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Circular Score */}
              <div className="flex-shrink-0">
                <CircularScore 
                  score={result.overallScore} 
                  color={result.riskColor}
                  size={160}
                  strokeWidth={10}
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h2 className="text-2xl font-bold">
                    {result.isPartial ? 'Partial TrustScore' : 'TrustScore'}
                  </h2>
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      backgroundColor: `${result.riskColor}22`,
                      color: result.riskColor,
                      border: `1px solid ${result.riskColor}44`
                    }}
                  >
                    {result.riskLevel} Risk
                  </span>
                  {result.isPartial && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      RPC ONLY
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-400 mb-4 leading-relaxed max-w-xl">
                  {result.explanation}
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Link to={`/profile/${address}`}>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/10 text-gray-300 hover:bg-white/5"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <a
                    href={getAddressExplorerUrl(address)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-gray-300 hover:bg-white/5"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Explorer
                    </Button>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Wallet Info Bar */}
            <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  label: 'Balance',
                  value: result.walletInfo.balance ? `${Number(result.walletInfo.balance).toFixed(4)} OPN` : 'Unavailable',
                  icon: Wallet
                },
                {
                  label: 'Tx Count / Nonce',
                  value: result.walletInfo.transactionCount !== undefined ? String(result.walletInfo.transactionCount) : 'Unavailable from RPC',
                  icon: Hash
                },
                {
                  label: 'Chain ID',
                  value: result.walletInfo.chainId !== undefined ? String(result.walletInfo.chainId) : 'Unavailable from RPC',
                  icon: Activity
                },
                {
                  label: 'Latest Block',
                  value: result.walletInfo.latestBlock !== undefined ? String(result.walletInfo.latestBlock) : 'Unavailable from RPC',
                  icon: Box
                },
                {
                  label: 'Wallet Age',
                  value: result.walletInfo.ageInDays !== undefined ? `${result.walletInfo.ageInDays} days` : 'Unavailable from RPC',
                  icon: Clock
                },
                {
                  label: 'First Active',
                  value: result.walletInfo.firstTransactionDate || 'Unavailable from RPC',
                  icon: TrendingUp
                },
              ].map((info, i) => (
                <div key={i} className="text-center md:text-left">
                  <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
                    <info.icon className="w-3 h-3" />
                    {info.label}
                  </div>
                  <div className="text-xs font-medium text-white truncate" title={info.value}>{info.value}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Scores */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Category Breakdown
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryEntries.map(([key, category], i) => (
                <CategoryCard key={key} category={category} index={i + 1} />
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Reputation Badges
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {result.badges.map((badge, i) => (
                <BadgeCard key={badge.id} badge={badge} index={i + 1} />
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <motion.div
            custom={8}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-xl p-6"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Recommendations
            </h2>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-purple-400">{i + 1}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{rec}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Analyze Another */}
          <motion.div
            custom={9}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link to="/analyze">
              <Button
                variant="outline"
                className="border-white/10 text-gray-300 hover:bg-white/5"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Analyze Another Wallet
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
