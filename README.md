<div align="center">

# nextjs-foundry-starter

> Modern Web3 dApp monorepo template with Next.js 16, React 19, and Foundry smart contracts.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)
![Solidity](https://img.shields.io/badge/Solidity-0.8.13-363636?style=flat-square&logo=solidity)
![Foundry](https://img.shields.io/badge/Foundry-Latest-black?style=flat-square)

[What is this?](#what-is-nextjs-foundry-starter) • [Features](#key-features) • [Tech Stack](#tech-stack) • [Quick Start](#quick-start) • [How It Works](#how-it-works) • [Deployment](#deployment)

</div>

A production-ready starter for building decentralized applications with cutting-edge frontend technologies and Solidity development best practices.

---

## What is nextjs-foundry-starter?

**nextjs-foundry-starter** is a full-stack Web3 development template designed to eliminate setup friction and let you focus on building your dApp.

**The Problem**: Setting up a modern Web3 project involves juggling frontend frameworks, smart contract tooling, monorepo architecture, deployment configurations, and type safety. Most templates are either too minimal or overcomplicated.

**The Solution**: This template provides a carefully architected foundation that combines:
- Latest React/Next.js features (Server Components, App Router)
- Blazing-fast Solidity development with Foundry
- Type-safe contract integration
- Production-optimized Docker builds
- Modern styling with Tailwind v4

**Best For**: Developers building Web3 applications who want a solid starting point with modern best practices baked in.

## Key Features

- ⚡ **Next.js 16 + React 19** - Server Components, App Router, and streaming SSR
- 🎨 **Tailwind CSS v4** - New @theme syntax, OKLCH colors, built-in dark mode
- 🔗 **Foundry Integration** - Fast Solidity compilation, testing, and ABI sync
- 🔐 **Web3 Ready** - Wagmi v2 and Viem with error handling and loading states
- 📦 **pnpm Monorepo** - Isolated dependencies with symlink efficiency
- 🎯 **Type-Safe Development** - End-to-end TypeScript with strict mode
- 🧩 **shadcn/ui Components** - Copy-paste components you own and customize
- 🏗️ **SOLID Architecture** - DRY principles, reusable hooks, and separation of concerns
- 🐳 **Production Docker** - Multi-stage builds (~150MB final image)
- 🔒 **Code Quality Automation** - Pre-commit hooks with ESLint + Husky

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19, TypeScript 5.7 | Modern React framework with Server Components |
| **Styling** | Tailwind CSS v4, shadcn/ui | Utility-first CSS with customizable components |
| **Web3** | Wagmi v2, Viem, React Query | Wallet connection and contract interaction |
| **Smart Contracts** | Foundry, Solidity ^0.8.13 | Fast contract development and testing |
| **Monorepo** | pnpm workspaces | Efficient package management with symlinks |
| **Deployment** | Docker, Vercel | Production-optimized containerization |
| **Code Quality** | ESLint v9, Husky, TypeScript | Automated linting and type checking |

---

## Quick Start

### Prerequisites

- **Node.js 20+**
- **pnpm 8+**
- **Foundry** (install below)
- **Docker** (optional, for production deployment)

### Installing Foundry

Foundry is required to compile and test smart contracts:

```bash
# Install foundryup
curl -L https://foundry.paradigm.xyz | bash

# Run foundryup to install forge, cast, anvil, and chisel
foundryup

# Verify installation
forge --version
```

**Windows users:** Use Git BASH or WSL (PowerShell/CMD not supported)

### Installation

```bash
# Clone the repository
git clone https://github.com/vdrnxs/nextjs-foundry-starter.git
cd nextjs-foundry-starter

# Install frontend dependencies
pnpm install

# Initialize Foundry (smart contracts)
forge init foundry --no-git
```

> **Note**: Each developer runs `forge init` locally to get the latest Foundry version.

### Development Commands

**Frontend**:
| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Next.js dev server (port 3000) |
| `pnpm lint` | Lint frontend code with ESLint |
| `pnpm build:web` | Build production bundle |

**Smart Contracts**:
| Command | Description |
|---------|-------------|
| `anvil` | Start local Ethereum node (Chain ID: 31337) |
| `pnpm sync-abis` | Sync contract ABIs to frontend |
| `cd foundry && forge test` | Run contract tests |
| `cd foundry && forge test -vvv` | Run tests with verbose output |

### Running Locally

```bash
# Start development server
# This runs "next dev" in apps/web via workspace filter (--filter web)
pnpm dev

# Open http://localhost:3000
```

The `pnpm dev` command uses the workspace filter to execute `next dev` specifically in the `apps/web` package, as configured in the root `package.json`.

### Web3 Configuration

**Environment Variables** (optional):
```bash
# Copy the example file to apps/web/
cp .env.example apps/web/.env.local

# Edit apps/web/.env.local with your configuration
# Default values work for local development
```

Key variables:
- `NEXT_PUBLIC_LOCAL_RPC_URL` - RPC endpoint for Anvil (default: `http://127.0.0.1:8545`)
- `NEXT_PUBLIC_SIMPLE_TOKEN_ADDRESS` - Deployed SimpleToken address (update after deployment)

**Wagmi v2** is pre-configured with:
- **Networks**: Local development (Hardhat/Anvil) and Ethereum Mainnet
- **Connector**: Injected wallet (MetaMask, etc.)
- **Components**: `ConnectButton` for wallet connection, `NetworkSwitcher` for changing networks
- **Configuration**: See [providers.tsx](apps/web/components/providers.tsx) - RPC URL configurable via env vars

> **Note**: The template includes mainnet as an example of multi-network configuration. For local development, use the Hardhat chain (Chain ID 31337) which works with both Anvil and Hardhat. Add more networks by importing them from `wagmi/chains` and updating the `chains` array and `transports` in [providers.tsx](apps/web/components/providers.tsx:9-16).

**Start Anvil (local development node)**:
```bash
# In a separate terminal
anvil
```

Anvil will start a local Ethereum node and generate 10 test accounts with private keys. Import one to your wallet:
1. Copy a private key from the Anvil output (starts with `0x...`)
2. Import it to MetaMask: **Settings → Import Account → Paste Private Key**
3. Each account has **10,000 ETH** for testing

Then configure your wallet to connect to the local node:
- **Network Name**: Localhost 8545 (or any name you prefer)
- **RPC URL**: `http://localhost:8545`
- **Chain ID**: `31337`
- **Currency Symbol**: ETH

## Project Structure

```
nextjs-foundry-starter/
├── apps/
│   └── web/                    # Next.js frontend
│       ├── app/                # App Router pages
│       │   ├── globals.css     # Tailwind CSS + theme config
│       │   ├── layout.tsx      # Root layout
│       │   └── page.tsx        # Home page
│       ├── components/
│       │   ├── ui/             # shadcn/ui components
│       │   │   ├── button.tsx        # Button component
│       │   │   ├── card.tsx          # Card component
│       │   │   └── dropdown-menu.tsx # Dropdown component
│       │   ├── connect-button.tsx    # Wallet connection w/ error handling
│       │   ├── network-switcher.tsx  # Network selector dropdown
│       │   ├── mode-toggle.tsx       # Dark mode toggle
│       │   ├── theme-provider.tsx    # Theme context
│       │   └── providers.tsx         # Wagmi + React Query setup
│       ├── hooks/
│       │   └── useHydrationSafe.ts   # SSR hydration hook
│       ├── lib/
│       │   ├── contracts/      # Synced ABIs (gitignored)
│       │   ├── utils.ts        # Utilities (cn, etc.)
│       │   └── web3.ts         # Web3 constants & utilities
│       ├── public/             # Static assets
│       └── package.json        # Frontend dependencies
│
├── foundry/                    # Smart contracts
│   ├── src/                    # Solidity contracts
│   ├── test/                   # Forge tests
│   ├── script/                 # Deployment scripts
│   └── foundry.toml            # Foundry config
│
├── scripts/
│   └── sync-abis.js            # ABI synchronization
│
├── .husky/                     # Git hooks
├── .env.example                # Environment variables template
├── docker-compose.yml          # Docker orchestration
├── Dockerfile                  # Production image
├── package.json                # Root workspace config
└── pnpm-workspace.yaml         # Workspace definition
```

## Working with Contracts

### Contract Development Workflow

This template provides a streamlined workflow for connecting Solidity contracts to your React frontend:

**Write Solidity** → **Deploy Contract** → **Sync ABIs** → **Import in React**

#### Step-by-Step Guide:

1. **Write your contract** in `foundry/src/YourContract.sol`
   ```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.13;

   contract YourContract {
       function getValue() public pure returns (uint256) {
           return 42;
       }
   }
   ```

2. **Test your contract** (recommended)
   ```bash
   cd foundry
   forge test -vvv
   ```

3. **Deploy to local Anvil**
   ```bash
   # Make sure Anvil is running (anvil in a separate terminal)
   cd foundry
   forge create src/YourContract.sol:YourContract \
     --rpc-url http://localhost:8545 \
     --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
     --broadcast
   ```

   **Copy the deployed contract address** from the output (`Deployed to: 0x...`)

4. **Sync ABIs to frontend**
   ```bash
   # From project root
   pnpm sync-abis
   ```
   This copies contract ABIs from `foundry/out/` to `apps/web/lib/contracts/`

5. **Use in your React components**
   ```typescript
   import { useReadContract } from 'wagmi'
   import YourContractABI from '@/lib/contracts/YourContract.json'

   const CONTRACT_ADDRESS = '0x...' // Your deployed address

   export function MyComponent() {
     const { data } = useReadContract({
       address: CONTRACT_ADDRESS,
       abi: YourContractABI.abi,
       functionName: 'getValue',
     })

     return <div>Value: {data?.toString()}</div>
   }
   ```

> **Important**: ABIs in `apps/web/lib/contracts/` are build artifacts (gitignored). Always run `pnpm sync-abis` after contract changes.

### Quick Reference

**Common Wagmi Hooks:**
```typescript
// Reading contract data
import { useReadContract } from 'wagmi'
const { data, isLoading, error } = useReadContract({
  address: '0x...',
  abi: YourABI.abi,
  functionName: 'myFunction',
  args: [arg1, arg2],
})

// Writing to contract
import { useWriteContract } from 'wagmi'
const { writeContract, isPending } = useWriteContract()
await writeContract({
  address: '0x...',
  abi: YourABI.abi,
  functionName: 'myFunction',
  args: [arg1, arg2],
})

// Getting connected wallet
import { useAccount } from 'wagmi'
const { address, isConnected } = useAccount()
```

**Common Viem Utilities:**
```typescript
import { formatUnits, parseUnits, formatEther, parseEther } from 'viem'

// Convert wei to readable format
formatUnits(1000000000000000000n, 18) // "1.0"
formatEther(1000000000000000000n)     // "1.0" (shorthand for 18 decimals)

// Convert readable to wei
parseUnits('1.5', 18)  // 1500000000000000000n
parseEther('1.5')      // 1500000000000000000n (shorthand)
```

**Foundry Commands:**
```bash
forge build                    # Compile contracts
forge test                     # Run all tests
forge test -vvv                # Run tests with detailed output
forge test --match-test testFoo # Run specific test
anvil                          # Start local node
forge create src/Contract.sol:Contract --rpc-url http://localhost:8545 --private-key 0x... --broadcast
```

**Adding More Networks:**

To add additional networks (Sepolia, Polygon, etc.), update your [providers.tsx](apps/web/components/providers.tsx):

```typescript
import { hardhat, mainnet, sepolia, polygon } from 'wagmi/chains'

const config = createConfig({
  chains: [hardhat, mainnet, sepolia, polygon],
  transports: {
    [hardhat.id]: http('http://127.0.0.1:8545'),
    [mainnet.id]: http(), // Public RPC
    [sepolia.id]: http(), // Public RPC
    [polygon.id]: http(), // Public RPC
    // Or use custom RPC: http('https://your-rpc-url.com')
  },
})
```

The `NetworkSwitcher` component will automatically display all configured networks.

## Deployment

### Vercel (Recommended)

Deploy with zero configuration:

1. Import your repository at [vercel.com](https://vercel.com)
2. Vercel auto-detects Next.js monorepo
3. Deploy with one click

**Automatically handled**:
- Production dependency optimization
- Automatic bundle optimization
- Global CDN distribution
- Environment variables

### Docker (VPS/Self-Hosted)

Production-optimized multi-stage build:

```bash
# Build and run
docker-compose up

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f
```

**Optimizations included**:
- Multi-stage build (builder → runner)
- Next.js standalone output (~75% smaller)
- Only production dependencies in final image
- Non-root user for security
- **Final size**: ~150-200 MB (vs ~600-800 MB unoptimized)

> **Development**: Use `pnpm dev` locally (not Docker). Docker adds unnecessary overhead for local development.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Foundry Book](https://book.getfoundry.sh/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [pnpm Documentation](https://pnpm.io/)

## License

[MIT](LICENSE)

---

<div align="center">

**Built with modern tools for modern Web3 development**

[⭐ Star on GitHub](https://github.com/vdrnxs/nextjs-foundry-starter)

</div>
