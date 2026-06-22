import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Users,
  TrendingUp,
  Shield,
  Award,
  Network,
  Lock,
  Code,
  CheckCircle2,
  Zap,
  Globe,
  Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

const useCases = [
  {
    icon: Users,
    title: 'DAO Governance',
    description: 'Weight voting power by TrustScore to ensure quality participation and prevent governance attacks. High-trust wallets get proportionally more voting weight.',
    benefits: [
      'Prevent Sybil attacks on governance',
      'Reward long-term ecosystem participants',
      'Ensure informed decision making',
      'Reduce voter apathy'
    ],
    color: 'from-purple-500 to-indigo-500',
    code: `// Example: Weighted voting
function getVotingPower(address user) external view returns (uint256) {
  uint256 baseVotes = balanceOf(user);
  uint256 trustScore = trustRegistry.getScore(user);
  
  // Scale votes by trust score (0-100)
  return baseVotes * trustScore / 100;
}`
  },
  {
    icon: TrendingUp,
    title: 'DeFi Lending',
    description: 'Use TrustScore for risk-adjusted collateral ratios and interest rates. Trusted wallets get better terms, reducing protocol risk.',
    benefits: [
      'Risk-adjusted loan-to-value ratios',
      'Reputation-based interest rates',
      'Reduced liquidation risk',
      'Increased capital efficiency'
    ],
    color: 'from-green-500 to-emerald-500',
    code: `// Example: Collateral ratio
function getCollateralRatio(address borrower) 
  external view returns (uint256) {
  
  uint256 trustScore = trustRegistry.getScore(borrower);
  
  // Base 150%, up to 200% for trusted users
  return 150 + (trustScore / 2); // 150-200%
}`
  },
  {
    icon: Shield,
    title: 'Sybil Resistance',
    description: 'Filter out bot wallets and ensure fair airdrops, quests, and reward distributions. Only genuine, reputable wallets qualify.',
    benefits: [
      'Fair airdrop distribution',
      'Quest bot prevention',
      'Reward farming protection',
      'Quality user acquisition'
    ],
    color: 'from-blue-500 to-cyan-500',
    code: `// Example: Airdrop eligibility
function isEligibleForAirdrop(address user) 
  external view returns (bool) {
  
  uint256 trustScore = trustRegistry.getScore(user);
  
  // Require minimum trust score of 40
  return trustScore >= 40;
}`
  },
  {
    icon: Award,
    title: 'Builder Verification',
    description: 'Verify builder credentials and reputation before grant allocation or partnership. Ensure resources go to proven contributors.',
    benefits: [
      'Automated builder vetting',
      'Grant allocation optimization',
      'Partnership due diligence',
      'Reputation-based hiring'
    ],
    color: 'from-yellow-500 to-orange-500',
    code: `// Example: Grant eligibility
function canApplyForGrant(address builder)
  external view returns (bool) {
  
  uint256 score = trustRegistry.getScore(builder);
  bool hasBuilderBadge = trustRegistry
    .hasBadge(builder, "verified_builder");
  
  return score >= 60 && hasBuilderBadge;
}`
  },
  {
    icon: Network,
    title: 'Reputation Systems',
    description: 'Power social graphs, freelancer marketplaces, and trust-based matching. Build decentralized reputation into any application.',
    benefits: [
      'Decentralized freelancer ratings',
      'Trust-based matching',
      'Social graph weighting',
      'P2P transaction safety'
    ],
    color: 'from-pink-500 to-rose-500',
    code: `// Example: Reputation query
function getUserReputation(address user) 
  external view returns (
    uint256 score,
    string memory riskLevel,
    bytes32[] memory badges
  ) {
  
  TrustScore memory ts = trustRegistry
    .getFullScore(user);
  
  return (ts.score, ts.riskLevel, ts.badges);
}`
  },
  {
    icon: Lock,
    title: 'Access Control',
    description: 'Gate premium features, beta access, and exclusive communities by trust tier. Create reputation-gated experiences.',
    benefits: [
      'Premium feature gating',
      'Beta access control',
      'Exclusive community entry',
      'Tiered service levels'
    ],
    color: 'from-violet-500 to-purple-500',
    code: `// Example: Access control
modifier requiresTrustScore(uint256 minScore) {
  require(
    trustRegistry.getScore(msg.sender) >= minScore,
    "Insufficient trust score"
  );
  _;
}

function premiumFeature() external 
  requiresTrustScore(70) {
  // Only trusted users can access
}`
  }
];

export default function Protocols() {
  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-transparent to-transparent" />
          <div className="absolute inset-0 grid-bg" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Code className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">For Protocol Developers</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Protocol <span className="gradient-text">Integration</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Integrate OPN TrustScore into your protocol to enable reputation-aware 
            features across DeFi, DAOs, and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/analyze">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6">
                <Zap className="w-4 h-4 mr-2" />
                Try It Live
              </Button>
            </Link>
            <a href="#contract">
              <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5">
                <Code className="w-4 h-4 mr-2" />
                View Contract
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Integration Overview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Simple Integration</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Query the TrustScoreRegistry contract or use our SDK to get reputation data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Database,
                title: '1. Read On-Chain',
                description: 'Query the TrustScoreRegistry contract on OPN Chain for any wallet address.',
              },
              {
                icon: Code,
                title: '2. Apply Logic',
                description: 'Use the score in your protocol logic for gating, pricing, or weighting.',
              },
              {
                icon: Globe,
                title: '3. Go Live',
                description: 'Deploy your enhanced protocol with reputation-aware features.',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-7 h-7 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-[#080814]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-bold mb-4">Use Cases</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Six powerful ways protocols can leverage TrustScore.
            </p>
          </motion.div>

          <div className="space-y-6">
            {useCases.map((useCase, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-xl overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center`}>
                          <useCase.icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{useCase.title}</h3>
                      </div>
                      <p className="text-gray-400 mb-4 leading-relaxed">{useCase.description}</p>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {useCase.benefits.map((benefit, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-80 flex-shrink-0">
                      <div className="glass rounded-lg p-4 font-mono text-xs text-gray-400 overflow-x-auto">
                        <pre>{useCase.code}</pre>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Info */}
      <section id="contract" className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass rounded-xl p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-purple-400" />
              TrustScoreRegistry Contract
            </h2>
            <p className="text-gray-400 mb-6">
              The on-chain registry stores verified TrustScores. Protocols can query 
              scores and badges for any wallet address.
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03]">
                <span className="text-sm text-gray-400">Contract Address</span>
                <span className="font-mono text-sm text-gray-300">
                  {import.meta.env.NEXT_PUBLIC_TRUSTSCORE_REGISTRY_ADDRESS || 'Coming Soon'}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03]">
                <span className="text-sm text-gray-400">Network</span>
                <span className="text-sm text-gray-300">OPN Testnet (Chain ID: 984)</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03]">
                <span className="text-sm text-gray-400">Status</span>
                <span className="text-sm text-yellow-400">In Development</span>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-white/[0.03] font-mono text-xs text-gray-400 overflow-x-auto">
              <pre>{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface ITrustScoreRegistry {
  struct TrustScore {
    uint256 score;        // 0-100
    string riskLevel;     // Low, Medium, High, Critical
    address issuer;       // Score issuer
    uint256 timestamp;    // Last update
    string metadataURI;   // Extended data
  }
  
  function getScore(address wallet) external view returns (uint256);
  function getFullScore(address wallet) external returns (TrustScore memory);
  function hasBadge(address wallet, string calldata badgeId) external view returns (bool);
}`}</pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-10 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              Ready to Integrate <span className="gradient-text">TrustScore</span>?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              Start building reputation-aware features into your OPN protocol today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/analyze">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8">
                  <Zap className="w-4 h-4 mr-2" />
                  Analyze a Wallet
                </Button>
              </Link>
              <a
                href="https://iopn.gitbook.io/iopn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 px-8">
                  <Globe className="w-4 h-4 mr-2" />
                  OPN Docs
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
