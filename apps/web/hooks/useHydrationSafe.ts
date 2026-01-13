import { useState, useEffect } from 'react';

/**
 * Hook to prevent hydration mismatch errors in SSR
 *
 * Returns false on server and first client render,
 * then true after hydration is complete.
 *
 * Use this when rendering content that depends on client-only APIs
 * (like Web3 wallet state, localStorage, etc.)
 *
 * @example
 * ```tsx
 * const mounted = useHydrationSafe();
 * return mounted ? <ClientOnlyContent /> : <ServerFallback />;
 * ```
 */
export function useHydrationSafe(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}