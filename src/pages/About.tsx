import { motion } from 'framer-motion';
import { Link } from 'react-router';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Shield,
  Globe,
  Users,
  Award,
  TrendingUp,
  Lock,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Target,
  Heart,
  Cpu
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

const opnFeatures = [
  {
    icon: Globe,
    title: 'Verifiable Reputation',
    description: 'On-chain proof of trust that cannot be faked or transferred. Your reputation is cryptographically tied to your wallet and built through real actions.',
  },
  {
    icon: Shield,
    title: 'Portable Trust',
    description: 'Carry your reputation across every dApp, every protocol, every team you join in the OPN ecosystem. One score, infinite possibilities.',
  },
  {
    icon: Users,
    title: 'Ecosystem Growth',
    description: 'Attract quality builders and users by making reputation visible and verifiable. Good actors are recognized and rewarded.',
  },
  {
    icon: Award,
    title: 'Builder Onboarding',
    description: 'Streamline builder verification for the OPN Builder Programme with automated, transparent scoring. Reduce manual overhead.',
  },
  {
    icon: TrendingUp,
    title: 'Safer DeFi',
    description: 'Risk-adjusted parameters based on reputation make DeFi protocols safer for everyone. TrustScore enables intelligent risk management.',
  },
  {
    icon: Lock,
    title: 'Future Credentials',
    description: 'Foundation for NeoID integration and the next generation of on-chain identity. TrustScore becomes the reputation layer of the Internet of People.',
  },
];

const opnStats = [
  { value: '10,000+', label: 'TPS', desc: 'Sub-second finality' },
  { value: '100%', label: 'EVM Compatible', desc: 'Solidity support' },
  { value: '984', label: 'Chain ID', desc: 'Testnet live' },
  { value: '6', label: 'Seasons', desc: 'Builder programme' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent" />
          <div className="absolute inset-0 grid-bg" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Heart className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Why This Matters</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold mb-4"
          >
            Built for <span className="gradient-text">OPN</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            OPN TrustScore aligns directly with the Internet of People vision —
            where identity, reputation, and opportunity are owned by individuals.
          </motion.p>
        </div>
      </section>

      {/* OPN Chain Overview */}
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
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">The Foundation</span>
            <h2 className="text-3xl font-bold mt-3 mb-4">OPN Chain Infrastructure</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              OPN Chain is an EVM-compatible Layer 1 blockchain built on Cosmos SDK with 
              Tendermint BFT consensus, delivering 10,000+ TPS with sub-second finality.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {opnStats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-xl p-6 text-center"
              >
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm font-medium text-white mb-1">{stat.label}</div>
                <div className="text-xs text-gray-500">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why OPN Needs TrustScore */}
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
            <span className="text-blue-400 text-sm font-semibold uppercase tracking-wider">The Vision</span>
            <h2 className="text-3xl font-bold mt-3 mb-4">
              Why OPN Needs <span className="gradient-text">TrustScore</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The Internet of People is built on human participation. TrustScore 
              makes that participation verifiable and reputation portable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opnFeatures.map((feature, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-xl p-6 hover:bg-white/[0.07] transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPN Ecosystem Alignment */}
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
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">Ecosystem</span>
            <h2 className="text-3xl font-bold mt-3 mb-4">Aligned with OPN Priorities</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                title: 'Builder Programme Season 1',
                desc: 'TrustScore provides the reputation infrastructure for the OPN Builder Programme. Verified builders get recognized, and their contributions become part of their permanent on-chain reputation.',
                icon: Target,
                align: 'Builders earn reputation that persists across seasons',
              },
              {
                title: 'NeoPoints & Loyalty System',
                desc: 'TrustScore complements the NeoPoints loyalty system by adding a behavioral reputation layer. Points measure economic participation; TrustScore measures behavioral trust.',
                icon: Award,
                align: 'Economic + behavioral = complete reputation picture',
              },
              {
                title: 'NeoID Identity Layer',
                desc: 'TrustScore is designed to integrate with NeoID as the reputation component of OPN identity. Your TrustScore becomes part of your portable, sovereign digital identity.',
                icon: Shield,
                align: 'Identity + Reputation = Verified Personhood',
              },
              {
                title: 'ATLAS AI Ecosystem',
                desc: 'TrustScore data enables AI-powered risk assessment and reputation modeling across the ATLAS ecosystem, making AI agents reputation-aware.',
                icon: Cpu,
                align: 'AI agents can evaluate trust programmatically',
              },
              {
                title: 'Season 1: DeFi & Open Finance',
                desc: 'The active season focus on DeFi directly benefits from TrustScore for risk-adjusted lending, Sybil-resistant airdrops, and reputation-weighted governance.',
                icon: TrendingUp,
                align: 'DeFi protocols get built-in risk management',
              },
              {
                title: 'Real-World Access',
                desc: 'As OPN bridges on-chain reputation to real-world opportunities, TrustScore becomes the bridge between digital behavior and physical access.',
                icon: Globe,
                align: 'On-chain reputation unlocks real-world value',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass rounded-xl p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-3 leading-relaxed">{item.desc}</p>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-green-400">{item.align}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OPN Links */}
      <section className="py-16 bg-[#080814]">
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl font-bold mb-4">Explore OPN</h2>
            <p className="text-gray-400">Official resources to learn more about the ecosystem.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'OPN Builders', url: 'https://builders.iopn.tech/', desc: 'Builder Programme' },
              { name: 'Documentation', url: 'https://iopn.gitbook.io/iopn', desc: 'Official Docs' },
              { name: 'Learn Platform', url: 'https://learn.iopn.tech/', desc: 'Learn & Earn' },
              { name: 'OPN Chain', url: 'https://chain.iopn.io/', desc: 'Chain Info' },
              { name: 'Explorer', url: 'https://testnet.iopn.tech', desc: 'Testnet Explorer' },
              { name: 'IOPn Website', url: 'https://iopn.tech', desc: 'Main Site' },
            ].map((link, i) => (
              <motion.a
                key={i}
                custom={i + 1}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-4 hover:bg-white/[0.07] transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{link.name}</span>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-colors" />
                </div>
                <span className="text-xs text-gray-500">{link.desc}</span>
              </motion.a>
            ))}
          </div>
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
            <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">
              Be Part of the <span className="gradient-text">Internet of People</span>
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              Start building your on-chain reputation today. Analyze your wallet, 
              join the Builder Programme, and become a verified member of OPN.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/analyze">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Analyze Your Wallet
                </Button>
              </Link>
              <a
                href="https://builders.iopn.tech/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-white/10 text-gray-300 hover:bg-white/5 px-8">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Join Builder Programme
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
