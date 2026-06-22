import { Link } from 'react-router';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Shield,
  ArrowRight,
  Activity,
  Users,
  Award,
  Zap,
  Lock,
  Globe,
  TrendingUp,
  ChevronRight,
  Wallet,
  Search,
  BarChart3,
  BadgeCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Database,
  Cpu,
  Network
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06060f]/60 via-[#06060f]/80 to-[#06060f]" />
          <div className="absolute inset-0 grid-bg" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-sm text-gray-300">OPN Builder Programme Season 1</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            <span className="text-white">Verifiable Reputation</span>
            <br />
            <span className="gradient-text">For OPN Chain</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A decentralized trust layer that converts wallet activity, builder credentials,
            and on-chain behavior into a transparent TrustScore for DeFi, DAOs, and beyond.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/analyze">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-6 text-base font-semibold shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
              >
                <Search className="w-5 h-5 mr-2" />
                Analyze Wallet
              </Button>
            </Link>
            <Link to="/protocols">
              <Button
                variant="outline"
                size="lg"
                className="border-white/10 text-white hover:bg-white/5 px-8 py-6 text-base"
              >
                Protocol Integration
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '7', label: 'Score Categories', icon: BarChart3 },
              { value: '0-100', label: 'TrustScore Range', icon: Activity },
              { value: '100%', label: 'Transparent', icon: BadgeCheck },
              { value: 'EVM', label: 'OPN Chain Ready', icon: Cpu },
            ].map((stat, i) => (
              <div
                key={i}
                className="glass rounded-xl p-4 text-center"
              >
                <stat.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-purple-400"
            />
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">The Problem</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Trust is <span className="gradient-text">Opaque & Fragile</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Web3 lacks a unified reputation system. Every protocol operates in isolation,
              forcing users to rebuild trust from scratch.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: AlertTriangle,
                title: 'No Unified Identity',
                description: 'Wallet addresses are pseudonymous. There is no portable way to prove reputation across protocols.',
                color: 'text-red-400',
                bg: 'bg-red-500/10',
              },
              {
                icon: Lock,
                title: 'Sybil Attacks',
                description: 'Without reputation scoring, malicious actors create unlimited wallets to exploit airdrops, governance, and incentives.',
                color: 'text-orange-400',
                bg: 'bg-orange-500/10',
              },
              {
                icon: Clock,
                title: 'Manual Verification',
                description: 'DAOs and DeFi protocols waste resources on manual KYC and due diligence for every participant.',
                color: 'text-yellow-400',
                bg: 'bg-yellow-500/10',
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-xl p-6 hover:bg-white/[0.07] transition-colors"
              >
                <div className={`w-12 h-12 rounded-lg ${card.bg} flex items-center justify-center mb-4`}>
                  <card.icon className={`w-6 h-6 ${card.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 relative bg-[#080814]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">The Solution</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              <span className="gradient-text">OPN TrustScore</span> Protocol
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A transparent, on-chain reputation layer that converts behavior into
              verifiable trust metrics for the entire OPN ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              custom={1}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  icon: Shield,
                  title: 'Transparent Scoring',
                  description: 'Every score component is documented and explainable. Users know exactly why they received their rating.',
                },
                {
                  icon: Database,
                  title: 'On-Chain Verification',
                  description: 'Scores are backed by real on-chain data from OPN Chain. No black boxes, no hidden algorithms.',
                },
                {
                  icon: Globe,
                  title: 'Portable Reputation',
                  description: 'One TrustScore works across all OPN protocols. Your reputation travels with your wallet.',
                },
                {
                  icon: Zap,
                  title: 'Instant Assessment',
                  description: 'Get your TrustScore in seconds. No waiting, no manual review, no friction.',
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden glass-strong p-6 glow-purple">
                <img
                  src="/trustscore-visual.jpg"
                  alt="TrustScore Visualization"
                  className="w-full h-auto rounded-xl"
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="glass rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400">TrustScore</div>
                        <div className="text-sm font-bold text-white">87/100</div>
                      </div>
                    </div>
                    <span className="text-xs text-green-400 font-medium">Low Risk</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scoring Categories */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Seven Dimensions of <span className="gradient-text">Trust</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our scoring model evaluates wallets across seven weighted categories
              for a comprehensive reputation assessment.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Clock, title: 'Wallet Age', desc: 'How long the wallet has been active on the network. Older wallets score higher.', weight: '15%', color: 'from-blue-500 to-cyan-500' },
              { icon: Activity, title: 'Activity Consistency', desc: 'Frequency and regularity of transactions. Consistent activity builds trust.', weight: '20%', color: 'from-purple-500 to-pink-500' },
              { icon: TrendingUp, title: 'Transaction History', desc: 'Volume and diversity of transactions. Rich history indicates engagement.', weight: '15%', color: 'from-green-500 to-emerald-500' },
              { icon: Users, title: 'Ecosystem Participation', desc: 'Engagement with OPN ecosystem events, quests, and community activities.', weight: '15%', color: 'from-yellow-500 to-orange-500' },
              { icon: Award, title: 'Builder Reputation', desc: 'Participation in the OPN Builder Programme and verified contributions.', weight: '10%', color: 'from-red-500 to-rose-500' },
              { icon: BadgeCheck, title: 'Credential Ownership', desc: 'On-chain credentials, badges, and soulbound tokens earned.', weight: '10%', color: 'from-indigo-500 to-violet-500' },
              { icon: Wallet, title: 'DeFi Participation', desc: 'Interaction with DeFi protocols, staking, and liquidity provision.', weight: '15%', color: 'from-teal-500 to-cyan-500' },
            ].map((cat, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-xl p-5 hover:bg-white/[0.07] transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono text-gray-500">{cat.weight}</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">{cat.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 relative bg-[#080814]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Use Cases</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Built for <span className="gradient-text">OPN Protocols</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              TrustScore integrates seamlessly into every layer of the OPN ecosystem.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'DAO Governance',
                description: 'Weight voting power by reputation. Prevent governance attacks and ensure quality participation.',
              },
              {
                icon: TrendingUp,
                title: 'DeFi Lending',
                description: 'Use TrustScore for risk-adjusted collateral ratios and interest rates.',
              },
              {
                icon: Shield,
                title: 'Sybil Resistance',
                description: 'Filter out bot wallets and ensure fair airdrops, quests, and reward distributions.',
              },
              {
                icon: Award,
                title: 'Builder Verification',
                description: 'Verify builder credentials and reputation before grant allocation or partnership.',
              },
              {
                icon: Network,
                title: 'Reputation Systems',
                description: 'Power social graphs, freelancer marketplaces, and trust-based matching.',
              },
              {
                icon: Lock,
                title: 'Access Control',
                description: 'Gate premium features, beta access, and exclusive communities by trust tier.',
              },
            ].map((useCase, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-xl p-6 hover:bg-white/[0.07] transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all">
                  <useCase.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{useCase.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{useCase.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPN Alignment */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Why OPN</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Aligned with <span className="gradient-text">OPN Vision</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              OPN TrustScore directly supports the Internet of People mission.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Verifiable Reputation', desc: 'On-chain proof of trust that cannot be faked or transferred. Your reputation is yours alone.' },
              { title: 'Portable Trust', desc: 'Carry your reputation across every dApp, every protocol, every team you join in the OPN ecosystem.' },
              { title: 'Ecosystem Growth', desc: 'Attract quality builders and users by making reputation visible and verifiable.' },
              { title: 'Builder Onboarding', desc: 'Streamline builder verification for the OPN Builder Programme with automated scoring.' },
              { title: 'Safer DeFi', desc: 'Risk-adjusted parameters based on reputation make DeFi protocols safer for everyone.' },
              { title: 'Future Credentials', desc: 'Foundation for NeoID integration and the next generation of on-chain identity.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-start gap-3 p-4 rounded-xl glass"
              >
                <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 relative bg-[#080814]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">Roadmap</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-4">
              Building the <span className="gradient-text">Future</span>
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-transparent md:-translate-x-px" />

            {[
              {
                phase: 'Phase 1',
                title: 'MVP Launch',
                desc: 'Core scoring engine, wallet analysis, and reputation profile. OPN Testnet integration.',
                status: 'current',
              },
              {
                phase: 'Phase 2',
                title: 'Real Data Integration',
                desc: 'Connect to OPN Chain RPC for live transaction data. Explorer API integration for richer insights.',
                status: 'upcoming',
              },
              {
                phase: 'Phase 3',
                title: 'Smart Contract Registry',
                desc: 'Deploy TrustScoreRegistry.sol to OPN Chain. On-chain score attestation and verification.',
                status: 'upcoming',
              },
              {
                phase: 'Phase 4',
                title: 'Protocol SDK',
                desc: 'NPM package for protocols to integrate TrustScore. React components and hooks.',
                status: 'upcoming',
              },
              {
                phase: 'Phase 5',
                title: 'NeoID Integration',
                desc: 'Integrate with OPN NeoID for enhanced identity verification and credential linking.',
                status: 'upcoming',
              },
              {
                phase: 'Phase 6',
                title: 'Mainnet Launch',
                desc: 'Full deployment on OPN Chain mainnet. Production-ready reputation infrastructure.',
                status: 'upcoming',
              },
            ].map((phase, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="glass rounded-xl p-5 ml-10 md:ml-0">
                    <span className={`text-xs font-mono ${
                      phase.status === 'current' ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {phase.phase}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-1 mb-2">{phase.title}</h3>
                    <p className="text-sm text-gray-400">{phase.desc}</p>
                  </div>
                </div>
                <div className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-6 ${
                  phase.status === 'current'
                    ? 'bg-green-400 shadow-lg shadow-green-400/50'
                    : 'bg-gray-700'
                }`} />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-10 text-center glow-purple"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Discover Your <span className="gradient-text">TrustScore</span>?
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Connect your wallet or enter any OPN address to get an instant reputation analysis.
            </p>
            <Link to="/analyze">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-10 py-6 text-base font-semibold shadow-xl shadow-purple-500/25"
              >
                <Search className="w-5 h-5 mr-2" />
                Analyze Wallet Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
