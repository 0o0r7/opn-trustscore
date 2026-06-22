import { useParams, Link } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { calculateTrustScore } from '@/lib/trustScoreEngine';
import { getAddressExplorerUrl, formatAddress } from '@/lib/opn';
import { useMemo } from 'react';
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
  CheckCircle2,
  Share2,
  Copy,
  AlertTriangle
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

export default function Profile() {
  const { address } = useParams<{ address: string }>();
  
  const result = useMemo(() => {
    if (!address) return null;
    return calculateTrustScore(address);
  }, [address]);

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

  const earnedBadges = result.badges.filter(b => b.earned);
  const scoreColor = result.overallScore >= 80 ? '#10B981' : result.overallScore >= 60 ? '#3B82F6' : result.overallScore >= 40 ? '#F59E0B' : '#EF4444';

  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <Link
              to={`/dashboard/${address}`}
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </motion.div>

          {/* Public Profile Card */}
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="glass-strong rounded-2xl overflow-hidden gradient-border mb-6"
          >
            {/* Card Header */}
            <div className="relative h-32 bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-purple-900/50">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute -bottom-12 left-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-xl border-4 border-[#0d0d1a]">
                  <Shield className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Card Body */}
            <div className="pt-14 px-6 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">OPN Wallet Profile</h1>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-gray-400">{formatAddress(address)}</span>
                    <button
                      onClick={() => navigator.clipboard?.writeText(address)}
                      className="text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <a
                      href={getAddressExplorerUrl(address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-purple-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span
                    className="px-3 py-1.5 rounded-lg text-sm font-bold"
                    style={{ 
                      backgroundColor: `${scoreColor}22`,
                      color: scoreColor,
                      border: `1px solid ${scoreColor}44`
                    }}
                  >
                    {result.overallScore}/100
                  </span>
                </div>
              </div>

              {/* Score Overview */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="glass rounded-lg p-3 text-center">
                  <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{result.walletInfo.ageInDays}</div>
                  <div className="text-[10px] text-gray-500">Days Old</div>
                </div>
                <div className="glass rounded-lg p-3 text-center">
                  <Activity className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{result.walletInfo.transactionCount}</div>
                  <div className="text-[10px] text-gray-500">Transactions</div>
                </div>
                <div className="glass rounded-lg p-3 text-center">
                  <Award className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-white">{earnedBadges.length}</div>
                  <div className="text-[10px] text-gray-500">Badges</div>
                </div>
              </div>

              {/* Risk Level */}
              <div className="mt-4 flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${scoreColor}11` }}>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: scoreColor }} />
                <span className="text-sm text-gray-300">
                  Risk Level: <span className="font-semibold" style={{ color: scoreColor }}>{result.riskLevel}</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Badges Section */}
          <motion.div
            custom={1}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-xl p-6 mb-6"
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Earned Badges
            </h2>
            
            {earnedBadges.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Shield className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No badges earned yet. Start engaging with the OPN ecosystem!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03]"
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      badge.tier === 'platinum' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                      badge.tier === 'gold' ? 'bg-gradient-to-br from-yellow-500 to-amber-400' :
                      badge.tier === 'silver' ? 'bg-gradient-to-br from-gray-400 to-gray-300' :
                      'bg-gradient-to-br from-orange-500 to-amber-600'
                    }`}>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{badge.name}</span>
                        {badge.tier && (
                          <span className="text-[10px] uppercase font-bold text-gray-500">{badge.tier}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Score Categories Mini */}
          <motion.div
            custom={2}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-xl p-6 mb-6"
          >
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Category Scores
            </h2>
            <div className="space-y-3">
              {Object.entries(result.categories).map(([key, cat]) => {
                const icons: Record<string, React.ElementType> = {
                  walletAge: Clock,
                  activityConsistency: Activity,
                  transactionHistory: TrendingUp,
                  ecosystemParticipation: Users,
                  builderReputation: Award,
                  credentialOwnership: BadgeCheck,
                  defiParticipation: Wallet,
                };
                const Icon = icons[key] || Shield;
                const getColor = (s: number) => {
                  if (s >= 80) return '#10B981';
                  if (s >= 60) return '#3B82F6';
                  if (s >= 40) return '#F59E0B';
                  return '#EF4444';
                };
                const color = getColor(cat.score);
                
                return (
                  <div key={key} className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-400 w-36 flex-shrink-0">{cat.label}</span>
                    <div className="flex-1 h-2 rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${cat.score}%`, backgroundColor: color }}
                      />
                    </div>
                    <span className="text-sm font-semibold w-8 text-right" style={{ color }}>
                      {cat.score}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div
            custom={3}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-sm text-gray-500 mb-4">
              This profile can be shared with any protocol or dApp in the OPN ecosystem.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button
                variant="outline"
                className="border-white/10 text-gray-300 hover:bg-white/5"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Link
              </Button>
              <Button
                variant="outline"
                className="border-white/10 text-gray-300 hover:bg-white/5"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: 'OPN TrustScore Profile', url: window.location.href });
                  } else {
                    navigator.clipboard?.writeText(window.location.href);
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
