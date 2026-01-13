'use client';

import { useAccount, useChainId } from 'wagmi';
import { Alert } from '@/components/ui/alert';
import { useHydrationSafe } from '@/hooks/useHydrationSafe';
import { EXPECTED_CHAIN_ID } from '@/lib/web3';

/**
 * Component that validates the connected wallet's network
 * and displays an alert if the user is on the wrong chain
 *
 * Single Responsibility: Network validation and user feedback
 */
export function NetworkValidator() {
  const mounted = useHydrationSafe();
  const { isConnected } = useAccount();
  const chainId = useChainId();

  const wrongNetwork = mounted && isConnected && chainId !== EXPECTED_CHAIN_ID;

  if (!wrongNetwork) return null;

  return (
    <Alert
      variant="error"
      title="Wrong Network"
      description={`Switch to Chain ID ${EXPECTED_CHAIN_ID} in your wallet`}
    />
  );
}