import { useAccount, useBalance, useDisconnect, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { opnWagmiChain } from '@/lib/opn';
import { useState, useCallback } from 'react';

export function useWallet() {
  const { address, isConnected, isConnecting, status } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const { data: balanceData } = useBalance({
    address,
    chainId: opnWagmiChain.id,
    query: {
      enabled: isConnected && !!address,
    },
  });
  
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    setError(null);
    try {
      connect({
        connector: injected(),
        chainId: opnWagmiChain.id,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    }
  }, [connect]);

  const disconnectWallet = useCallback(() => {
    disconnect();
    setError(null);
  }, [disconnect]);

  return {
    address,
    isConnected,
    isConnecting,
    status,
    balance: balanceData,
    connectWallet,
    disconnectWallet,
    error,
  };
}
