'use client';

import { useEffect, useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { Alert } from '@/components/ui/alert';
import { useHydrationSafe } from '@/hooks/useHydrationSafe';
import { EXPECTED_CHAIN_ID } from '@/lib/web3';

/**
 * Component that validates the connected wallet's network
 * and displays an alert if the user is on the wrong chain
 *
 * Single Responsibility: Network validation and user feedback
 * Automatically updates when user switches networks in their wallet
 */
export function NetworkValidator() {
  const mounted = useHydrationSafe();
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const [currentChainId, setCurrentChainId] = useState<number | undefined>(chainId);

  // Update local state when chainId changes (reactive to wallet network switches)
  useEffect(() => {
    if (mounted && chainId !== undefined) {
      setCurrentChainId(chainId);
    }
  }, [mounted, chainId]);

  const wrongNetwork = mounted && isConnected && currentChainId !== EXPECTED_CHAIN_ID;

  if (!wrongNetwork) return null;

  return (
    <Alert
      variant="error"
      title="Wrong Network"
      description={`Switch to Chain ID ${EXPECTED_CHAIN_ID} in your wallet`}
    />
  );
}