import { Link } from 'react-router';
import { Shield, Github, Twitter, Globe, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#06060f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-bold text-white">OPN TrustScore</span>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Decentralized trust and reputation layer for the OPN ecosystem.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/analyze', label: 'Analyze Wallet' },
                { to: '/protocols', label: 'Protocol Integration' },
                { to: '/about', label: 'About OPN' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-purple-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { href: 'https://builders.iopn.tech/', label: 'OPN Builders' },
                { href: 'https://iopn.gitbook.io/iopn', label: 'Documentation' },
                { href: 'https://chain.iopn.io/', label: 'OPN Chain' },
                { href: 'https://testnet.iopn.tech/', label: 'Explorer' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-purple-400 transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Connect</h3>
            <div className="flex items-center gap-3">
              <a
                href="https://iopn.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/iopnofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/iopn-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-purple-500/20 flex items-center justify-center text-gray-400 hover:text-purple-400 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            Built for the OPN Builder Programme Season 1. Not officially affiliated with IOPn.
          </p>
          <p className="text-xs text-gray-600">
            OPN Chain Testnet · Chain ID: 984
          </p>
        </div>
      </div>
    </footer>
  );
}
