import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { ConnectButton } from "@/components/connect-button"
import { TokenBalance } from "@/components/token-balance"
import { NETWORK_CONFIG } from "@/lib/web3"

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_SIMPLE_TOKEN_ADDRESS as `0x${string}`;

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ConnectButton />
        <ModeToggle />
      </div>
      <div className="w-full max-w-2xl space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to Aero</CardTitle>
            <CardDescription>
              Your Web3 application is ready to build
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your wallet to interact with the local development node (Chain ID: {NETWORK_CONFIG.chainId})
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>• Network: {NETWORK_CONFIG.name}</p>
              <p>• RPC: {NETWORK_CONFIG.rpcUrl}</p>
              <p>• Chain ID: {NETWORK_CONFIG.chainId}</p>
            </div>
          </CardContent>
        </Card>
        {CONTRACT_ADDRESS && <TokenBalance contractAddress={CONTRACT_ADDRESS} />}
      </div>
    </main>
  )
}