# OPN TrustScore

A decentralized trust and reputation layer for the OPN ecosystem. Converts wallet activity, ecosystem participation, builder credentials, and on-chain behavior into a transparent TrustScore.

## Project Overview

**Project Name:** OPN TrustScore  
**Category:** Identity & Reputation / AI & Compute / DeFi Infrastructure  
**Programme:** OPN Builder Programme Season 1 — DeFi & Open Finance

OPN TrustScore addresses a critical gap in the Web3 ecosystem: the lack of portable, verifiable reputation. By analyzing on-chain behavior across seven weighted categories, the platform generates a transparent TrustScore (0-100) that protocols can use for governance, lending, Sybil resistance, and access control.

## The Problem

- **No Unified Identity:** Wallet addresses are pseudonymous with no portable reputation
- **Sybil Attacks:** Malicious actors exploit airdrops, governance, and incentives with unlimited wallets
- **Manual Verification:** DAOs and DeFi protocols waste resources on repetitive due diligence
- **Opaque Risk:** No standardized way to assess wallet trustworthiness

## The Solution

OPN TrustScore provides:
- **Transparent Scoring:** Seven weighted categories with full explainability
- **On-Chain Verification:** Real OPN Chain data (with deterministic fallback demo mode)
- **Portable Reputation:** One score works across all OPN protocols
- **Instant Assessment:** Results in seconds, no manual review needed

## Features

### 1. Landing Page
- Hero section with OPN branding and TrustScore visualization
- Problem/Solution narrative
- Scoring methodology explanation
- Roadmap and ecosystem alignment

### 2. Wallet Analysis
- Manual address input with validation
- Injected wallet connection (e.g., MetaMask desktop or browser extension)
- Instant analysis with fallback demo mode

### 3. TrustScore Dashboard
- Circular score visualization with color-coded risk level
- Seven category breakdowns with progress bars
- Wallet info bar (balance, transactions, age)
- Explanation and recommendations
- Earned badges display

### 4. Reputation Profile
- Public profile card with QR-like avatar
- Badge showcase with tier indicators
- Category score bars
- Shareable URL

### 5. Protocol Integration
- Six use cases with code examples:
  - DAO Governance (weighted voting)
  - DeFi Lending (risk-adjusted ratios)
  - Sybil Resistance (airdrop filtering)
  - Builder Verification (automated vetting)
  - Reputation Systems (social graphs)
  - Access Control (feature gating)
- Smart contract interface documentation

### 6. OPN Alignment Page
- Ecosystem priorities mapping
- NeoID, NeoPoints, ATLAS integration paths
- Builder Programme connection
- Official resource links

## Architecture

```
OPN TrustScore/
├── src/
│   ├── App.tsx                    # Main router with all routes
│   ├── main.tsx                   # Entry point with wagmi provider
│   ├── index.css                  # Global dark theme styles
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── lib/
│   │   ├── opn.ts                 # OPN chain config, wagmi setup, utils
│   │   └── trustScoreEngine.ts    # Scoring algorithm
│   ├── hooks/
│   │   └── useWallet.ts           # Wallet connection hook
│   ├── components/
│   │   ├── Navbar.tsx             # Responsive navigation
│   │   └── Footer.tsx             # Footer with links
│   └── pages/
│       ├── Home.tsx               # Landing page
│       ├── Analyze.tsx            # Wallet input page
│       ├── Dashboard.tsx          # Score results page
│       ├── Profile.tsx            # Public profile page
│       ├── Protocols.tsx          # Integration docs page
│       └── About.tsx              # OPN alignment page
├── contracts/
│   └── TrustScoreRegistry.sol     # On-chain registry contract
├── public/
│   ├── hero-bg.jpg                # Hero background
│   └── trustscore-visual.jpg      # Score visualization
├── .env.example                   # Environment template
├── vite.config.ts                 # Vite configuration
├── tailwind.config.js             # Tailwind with custom theme
└── README.md                      # This file
```

## TrustScore Engine

### Scoring Categories

| Category | Weight | Description |
|----------|--------|-------------|
| Wallet Age | 15% | How long the wallet has been active |
| Activity Consistency | 20% | Regularity of transactions |
| Transaction History | 15% | Volume and diversity of transactions |
| Ecosystem Participation | 15% | OPN-specific engagement |
| Builder Reputation | 10% | Builder programme participation |
| Credential Ownership | 10% | On-chain badges and credentials |
| DeFi Participation | 15% | DeFi protocol interactions |

### Risk Levels

| Score | Risk Level | Color |
|-------|-----------|-------|
| 80-100 | Low | Green |
| 60-79 | Medium | Blue |
| 40-59 | High | Orange |
| 0-39 | Critical | Red |

### Scoring Algorithm

The engine uses a weighted average across all seven categories. Each category score (0-100) is multiplied by its weight and summed to produce the final TrustScore (0-100).

When real chain data is unavailable, the engine falls back to deterministic demo mode — generating consistent scores from the address hash. This is clearly labeled as "Fallback Demo Mode" on the dashboard.

## Smart Contract

### TrustScoreRegistry.sol

The on-chain registry stores:
- `TrustScore` struct: score (0-100), riskLevel, issuer, timestamp, metadataURI
- `Badge` struct: badgeId, name, tier, earned status, timestamp
- Owner-controlled issuer authorization
- Seven default badge types registered at deployment

### Key Functions

- `updateScore(wallet, score, riskLevel, metadataURI)` — Set/update trust score
- `awardBadge(wallet, badgeId, name, tier)` — Award a badge
- `getScore(wallet)` — Query a wallet's score
- `getFullScore(wallet)` — Get complete score data
- `hasBadge(wallet, badgeId)` — Check badge ownership
- `authorizeIssuer(issuer)` — Add authorized score issuer

### Deployment

The contract is designed for OPN Testnet (Chain ID: 984):
- RPC: `https://testnet-rpc.iopn.tech`
- Explorer: `https://testnet.iopn.tech`

## OPN Integration

### Chain Configuration
- **Network:** OPN Testnet
- **Chain ID:** 984
- **RPC URL:** https://testnet-rpc.iopn.tech
- **Explorer:** https://testnet.iopn.tech
- **Native Currency:** OPN (18 decimals)

### wagmi Configuration
The `lib/opn.ts` file exports a wagmi config with OPN Testnet as the default chain, using the injected connector (MetaMask, etc.) and HTTP transport.

### Future Integration Points
- NeoID identity verification
- NeoPoints loyalty system correlation
- ATLAS AI ecosystem data feeds
- Builder Programme on-chain credentials
- Origin NFT gamification hooks

## Tech Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **Web3:** wagmi + viem + ethers
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Contract:** Solidity 0.8.19

## Local Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- MetaMask (browser extension or desktop)

### Wallet Connection & Analysis

- **Injected Wallets:** The "Connect Wallet" feature supports injected providers such as the MetaMask desktop extension or built-in browsers of mobile wallets.
- **Mobile Support:** Standard mobile browsers (like Chrome on Android or Safari on iOS) may not support "Connect Wallet" because they lack an injected Web3 provider.
- **Recommended Method:** Manual wallet address analysis is the recommended universal method for all devices and browsers. Simply enter any OPN wallet address into the search field to begin analysis.

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd opn-trustscore

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`.

### Environment Variables

Create a `.env` file from the template:

```bash
cp .env.example .env
```

Available variables:
```
# OPN Chain Configuration
NEXT_PUBLIC_OPN_RPC_URL=https://testnet-rpc.iopn.tech
NEXT_PUBLIC_OPN_EXPLORER_API_URL=https://testnet.iopn.tech/api
NEXT_PUBLIC_TRUSTSCORE_REGISTRY_ADDRESS=0x0000000000000000000000000000000000000000
```

### Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Deployment

### Static Hosting
The built `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- IPFS

### Smart Contract Deployment

To deploy `TrustScoreRegistry.sol` to OPN Testnet, follow these steps:

#### 1. Environment Setup

Create or update your `.env` file with the following variables:
- `OPN_RPC_URL`: The RPC URL for OPN Testnet (`https://testnet-rpc.iopn.tech`).
- `PRIVATE_KEY`: The private key of your **temporary deployer wallet**.
- `INITIAL_OWNER_ADDRESS`: The address of the **permanent owner wallet** (this wallet will be granted administrative rights and authorized as an issuer upon deployment).

#### 2. Security Best Practices

- **NEVER** commit your `.env` file or private keys to version control.
- **NEVER** paste your private keys into AI tools or share them online.
- **Use a temporary deployer wallet:** Use a fresh wallet for deployment and fund it only with a small amount of OPN tokens needed for gas.
- **Separation of Concerns:** The deployer wallet is only used to pay for the contract creation. The `INITIAL_OWNER_ADDRESS` should be your secure, permanent project wallet.

#### 3. Deployment Commands

```bash
# Install dependencies
npm install

# Compile the contract
npx hardhat compile

# Deploy to OPN Testnet
npx hardhat run scripts/deploy.ts --network opnTestnet
```

#### 4. Post-Deployment

After a successful deployment:
1. Copy the deployed contract address from the console output.
2. Update your `NEXT_PUBLIC_TRUSTSCORE_REGISTRY_ADDRESS` in `.env` with this new address.
3. Your permanent owner wallet (set as `INITIAL_OWNER_ADDRESS`) now has full control over the registry.

## Real OPN Data vs. Fallback Demo Mode

The application is designed to use real on-chain data from the OPN RPC whenever possible.

### Real OPN Data Mode
When `NEXT_PUBLIC_OPN_RPC_URL` is configured and the RPC is reachable:
- **Real Data Fetched:** Native token balance, transaction count (nonce), chain ID, and latest block number.
- **Partial TrustScore:** Since some categories (like wallet age or ecosystem participation) require an explorer API or indexed data not available via standard RPC, the TrustScore is calculated as a **Partial TrustScore** based only on available real data.
- **Unavailable Fields:** Fields like "Wallet Age" or "First Active" will be marked as `Unavailable from RPC`.
- **Badge:** A `REAL OPN DATA` badge is displayed.

### Fallback Demo Mode
The application operates in "Fallback Demo Mode" if the RPC fails or if it's intentionally disabled:
- **Deterministic Data:** Scores and wallet values are deterministically generated from the wallet address hash.
- **Consistency:** Each address produces consistent, unique results for demonstration purposes.
- **Badge:** A `FALLBACK DEMO MODE` badge is displayed.

### Testing Wallet Balance
To verify that real data is being used:
1. Set `NEXT_PUBLIC_OPN_RPC_URL` in your `.env` file.
2. Enter a wallet address that has a known balance on the OPN Testnet.
3. Observe the "Balance" field in the Dashboard; it should match the on-chain balance.
4. Check for the `REAL OPN DATA` badge and `RPC: SUCCESS` indicator.

## Future Roadmap

### Phase 1: MVP (Current)
- Core scoring engine
- Wallet analysis and dashboard
- Reputation profiles
- Smart contract design

### Phase 2: Real Data Integration
- OPN Chain RPC integration for live transaction data
- Explorer API for richer wallet insights
- Historical transaction analysis

### Phase 3: Smart Contract Deployment
- Deploy TrustScoreRegistry.sol to OPN Testnet
- On-chain score attestation
- Badge NFT minting

### Phase 4: Protocol SDK
- NPM package for easy integration
- React hooks and components
- Documentation and examples

### Phase 5: NeoID Integration
- Connect with OPN NeoID identity system
- Enhanced verification through on-chain identity
- Credential linking

### Phase 6: Mainnet Launch
- Full deployment on OPN Chain mainnet
- Production-ready infrastructure
- Protocol partner integrations

## OPN Alignment

This project directly supports the Internet of People vision:

1. **Verifiable Reputation:** On-chain proof of trust tied to real behavior
2. **Portable Trust:** One score across all OPN protocols
3. **Ecosystem Growth:** Attract quality participants with visible reputation
4. **Builder Onboarding:** Streamlined verification for the Builder Programme
5. **Safer DeFi:** Risk-adjusted parameters based on reputation
6. **Future Credentials:** Foundation for NeoID and next-gen identity

## Builder Programme Submission Summary

**Builder:** OPN TrustScore Team  
**Season:** 1 — DeFi & Open Finance  
**Track:** Identity & Reputation / AI & Compute / DeFi Infrastructure  
**Deliverables:**
- Complete React frontend with 6 pages
- Transparent TrustScore scoring engine (7 categories)
- TrustScoreRegistry.sol smart contract
- wagmi/viem Web3 integration
- Protocol integration documentation with code examples
- Production-ready deployment configuration

**Live Demo:** The application is fully functional — users can connect wallets, analyze addresses, view TrustScores, and explore protocol integration use cases.

## License

MIT License — Built for the OPN ecosystem.

## Resources

- [OPN Builders](https://builders.iopn.tech/)
- [OPN Documentation](https://iopn.gitbook.io/iopn)
- [OPN Chain](https://chain.iopn.io/)
- [Testnet Explorer](https://testnet.iopn.tech)
- [Learn OPN](https://learn.iopn.tech/)
