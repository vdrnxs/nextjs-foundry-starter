'use client';

import { useSwitchChain, useChainId } from 'wagmi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useHydrationSafe } from '@/hooks/useHydrationSafe';

export function NetworkSwitcher() {
  const mounted = useHydrationSafe();
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        Network
      </Button>
    );
  }

  const currentChain = chains.find((chain) => chain.id === chainId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {currentChain?.name || 'Select Network'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {chains.map((chain) => (
          <DropdownMenuItem
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
            className={chainId === chain.id ? 'bg-accent' : ''}
          >
            {chain.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}