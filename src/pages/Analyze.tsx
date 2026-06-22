import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useWallet } from '@/hooks/useWallet';
import { isValidAddress, formatAddress } from '@/lib/opn';
import {
  Search,
  Wallet,
  AlertCircle,
  Scan,
  Sparkles,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Analyze() {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const { address: connectedAddress, isConnected, connectWallet } = useWallet();
  const navigate = useNavigate();

  const handleAnalyze = () => {
    const targetAddress = address.trim() || connectedAddress;
    
    if (!targetAddress) {
      setError('Please enter a wallet address or connect your wallet');
      return;
    }
    
    if (!isValidAddress(targetAddress)) {
      setError('Invalid wallet address format. Must be 0x followed by 40 hex characters.');
      return;
    }
    
    setError('');
    navigate(`/dashboard/${targetAddress}`);
  };

  const handleConnectAndAnalyze = async () => {
    await connectWallet();
  };

  const useConnectedWallet = () => {
    if (connectedAddress) {
      setAddress(connectedAddress);
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-[#06060f] text-white">
      <Navbar />

      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-[#06060f] to-[#06060f]" />
          <div className="absolute inset-0 grid-bg" />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <Scan className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Wallet Analysis Engine</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Analyze <span className="gradient-text">Any Wallet</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Enter an OPN wallet address to get a comprehensive TrustScore and reputation profile.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-strong rounded-2xl p-6 sm:p-8"
          >
            {/* Input Area */}
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Wallet className="w-5 h-5 text-gray-500" />
                </div>
                <Input
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    setError('');
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder="Enter OPN wallet address (0x...)"
                  className="pl-12 pr-4 py-6 bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500 focus:ring-purple-500/20 font-mono text-sm"
                />
                {isConnected && (
                  <button
                    onClick={useConnectedWallet}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Use connected
                  </button>
                )}
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-400">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                onClick={handleAnalyze}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white py-6 text-base font-semibold shadow-lg shadow-purple-500/20"
              >
                <Search className="w-5 h-5 mr-2" />
                Analyze Wallet
              </Button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-[#0d0d1a] px-4 text-sm text-gray-500">or</span>
              </div>
            </div>

            {/* Connect Wallet */}
            <Button
              onClick={isConnected ? handleAnalyze : handleConnectAndAnalyze}
              variant="outline"
              className="w-full border-white/10 text-white hover:bg-white/5 py-6 text-base"
            >
              {isConnected ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                  Analyze Connected Wallet
                  <span className="ml-2 text-sm text-gray-400 font-mono">
                    {connectedAddress ? formatAddress(connectedAddress) : ''}
                  </span>
                </>
              ) : (
                <>
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect Wallet to Analyze
                </>
              )}
            </Button>
          </motion.div>

          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-3 gap-4 mt-8"
          >
            {[
              {
                icon: Scan,
                title: 'Instant Analysis',
                desc: 'Get results in seconds',
              },
              {
                icon: Sparkles,
                title: '7 Categories',
                desc: 'Comprehensive scoring',
              },
              {
                icon: Info,
                title: 'Full Transparency',
                desc: 'See how scores are calculated',
              },
            ].map((card, i) => (
              <div key={i} className="glass rounded-xl p-4 text-center">
                <card.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-medium text-white">{card.title}</div>
                <div className="text-xs text-gray-500 mt-1">{card.desc}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
