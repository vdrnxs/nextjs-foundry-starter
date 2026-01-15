import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ModeToggle } from "@/components/mode-toggle"
import { ConnectButton } from "@/components/connect-button"
import { NetworkSwitcher } from "@/components/network-switcher"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <NetworkSwitcher />
        <ConnectButton />
        <ModeToggle />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Your Web3 dApp</CardTitle>
          <CardDescription>
            Next.js + Foundry starter template
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Modern Web3 starter with Next.js 16, React 19, and Foundry smart contracts.
            Everything you need to build decentralized applications.
          </p>
          <div className="p-4 bg-muted rounded-lg space-y-3">
            <div>
              <p className="text-sm font-medium mb-1">📚 Documentation</p>
              <p className="text-xs text-muted-foreground">
                Check the{" "}
                <a
                  href="https://github.com/vdrnxs/nextjs-foundry-starter#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  README
                </a>
                {" "}for complete setup instructions, contract development workflow, and quick reference guides.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">🚀 Quick Start</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Write contracts in <code className="text-xs">foundry/src/</code></li>
                <li>• Deploy locally with <code className="text-xs">forge create</code></li>
                <li>• Sync ABIs with <code className="text-xs">pnpm sync-abis</code></li>
                <li>• Use in React with Wagmi hooks</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}