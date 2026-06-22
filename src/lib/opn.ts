import { type OPNChainConfig, type AnalyzedWalletData } from '@/types';
import { http, createConfig } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { createPublicClient, formatEther, type Address } from 'viem';

/**
 * OPN Chain Configuration
 * Official OPN Testnet details from chain.iopn.io
 * Chain ID: 984
 * RPC: https://testnet-rpc.iopn.tech
 * Explorer: https://testnet.iopn.tech
 */
export const opnTestnet: OPNChainConfig = {
  id: 984,
  name: 'OPN Testnet',
  network: 'opn-testnet',
  nativeCurrency: {
    name: 'OPN',
    symbol: 'OPN',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.iopn.tech'] },
    public: { http: ['https://testnet-rpc.iopn.tech'] },
  },
  blockExplorers: {
    default: { name: 'OPNScan', url: 'https://testnet.iopn.tech' },
  },
  testnet: true,
};

/**
 * Convert OPN config to wagmi chain format
 */
export const opnWagmiChain = {
  id: opnTestnet.id,
  name: opnTestnet.name,
  network: opnTestnet.network,
  nativeCurrency: opnTestnet.nativeCurrency,
  rpcUrls: opnTestnet.rpcUrls,
  blockExplorers: opnTestnet.blockExplorers,
  testnet: opnTestnet.testnet,
} as const;

/**
 * wagmi Configuration for OPN Chain
 */
export const wagmiConfig = createConfig({
  chains: [opnWagmiChain],
  connectors: [injected()],
  transports: {
    [opnWagmiChain.id]: http(import.meta.env.NEXT_PUBLIC_OPN_RPC_URL || opnTestnet.rpcUrls.default.http[0]),
  },
});

/**
 * Public Client for direct RPC calls
 */
export const publicClient = createPublicClient({
  chain: opnWagmiChain,
  transport: http(import.meta.env.NEXT_PUBLIC_OPN_RPC_URL || opnTestnet.rpcUrls.default.http[0]),
});

/**
 * RPC Functions
 */

export const getNativeBalance = async (address: string) => {
  return await publicClient.getBalance({ address: address as Address });
};

export const getLatestBlock = async () => {
  return await publicClient.getBlockNumber();
};

export const getChainId = async () => {
  return await publicClient.getChainId();
};

export const getTransactionCount = async (address: string) => {
  return await publicClient.getTransactionCount({ address: address as Address });
};

/**
 * Analyze wallet using real RPC data
 */
export const analyzeWallet = async (address: string): Promise<AnalyzedWalletData> => {
  try {
    const [balance, txCount, chainId, blockNumber] = await Promise.all([
      getNativeBalance(address),
      getTransactionCount(address),
      getChainId(),
      getLatestBlock(),
    ]);

    return {
      address,
      balance: balance.toString(),
      formattedBalance: formatEther(balance),
      chainId: Number(chainId),
      latestBlock: Number(blockNumber),
      transactionCount: Number(txCount),
      rpcStatus: 'success',
      dataMode: 'REAL_OPN_DATA',
    };
  } catch (error) {
    console.error('RPC analysis failed:', error);
    return {
      address,
      balance: '0',
      formattedBalance: '0',
      chainId: 'Unavailable from RPC',
      latestBlock: 'Unavailable from RPC',
      transactionCount: 'Unavailable from RPC',
      rpcStatus: 'failure',
      dataMode: 'FALLBACK_DEMO_MODE',
    };
  }
};

/**
 * Explorer API helper - constructs explorer URLs
 */
export const getExplorerUrl = (path: string): string => {
  const baseUrl = opnTestnet.blockExplorers.default.url;
  return `${baseUrl}/${path}`;
};

/**
 * Get address explorer link
 */
export const getAddressExplorerUrl = (address: string): string => {
  return getExplorerUrl(`address/${address}`);
};

/**
 * Get transaction explorer link
 */
export const getTransactionExplorerUrl = (hash: string): string => {
  return getExplorerUrl(`tx/${hash}`);
};

/**
 * Format address for display (0x1234...5678)
 */
export const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Validate Ethereum/OPN address
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

/**
 * Generate deterministic random from address (for demo fallback)
 * Uses the address bytes to generate consistent "fake" data per address
 */
export const generateDeterministicData = (address: string) => {
  const hash = address.toLowerCase();
  let seed = 0;
  for (let i = 2; i < hash.length; i++) {
    seed = ((seed << 5) - seed + hash.charCodeAt(i)) | 0;
  }
  
  const random = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  
  return { random, seed };
};
