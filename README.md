# VEXOR

> **Autonomous on-chain AI agent for Monad blockchain**

Built for [Rebel in Paradise 2026](https://rebel.openbuild.xyz) hackathon.

![VEXOR](https://img.shields.io/badge/VEXOR-Monad%20Agent-ff3d00?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## Overview

VEXOR is an AI-powered trading strategy agent that operates on the Monad blockchain. It combines natural language processing with on-chain capabilities to provide:

- **Trading Strategies** - Get AI-generated trading signals for crypto assets
- **Wallet Integration** - Connect your MetaMask to interact with Monad Testnet
- **Real-time Analysis** - Market sentiment, gas optimization, and swap routing
- **On-chain Actions** - Execute swaps, check balances, and stake MON

## Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Strategy Agent** | Natural language interface for trading strategies |
| 💼 **Wallet Connect** | MetaMask integration via wagmi + viem |
| ⚡ **Monad Native** | Built specifically for Monad's high-performance EVM |
| 🎨 **Brutalist UI** | Clean, editorial design that doesn't look like "AI slop" |
| 🔄 **Swap Routing** | Find optimal swap routes for token pairs |
| 📊 **Gas Optimization** | Real-time gas price monitoring |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite + TypeScript |
| Wallet | wagmi v2 + viem |
| Styling | CSS Variables + Space Mono font |
| API | Vercel Serverless Functions |
| Chain | Monad Testnet (Chain ID: 10143) |

## Quick Start

```bash
# Clone the repo
git clone https://github.com/N-45div/VEXOR.git
cd VEXOR

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
VEXOR/
├── api/
│   └── strategy.ts        # Vercel serverless proxy
├── public/
│   └── vexor.svg          # Logo
├── src/
│   ├── components/
│   │   ├── ChatMessage.tsx    # Message display with markdown
│   │   ├── StrategyPresets.tsx # Quick action buttons
│   │   └── WalletButton.tsx   # Wallet connection UI
│   ├── config/
│   │   └── wagmi.ts           # Monad chain config
│   ├── hooks/
│   │   └── useStrategyAgent.ts # API integration
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── vercel.json
└── package.json
```

## Monad Integration

VEXOR connects to Monad Testnet with the following configuration:

| Parameter | Value |
|-----------|-------|
| Chain ID | `10143` |
| RPC URL | `https://testnet-rpc.monad.xyz` |
| Currency | MON |
| Explorer | [testnet.monadexplorer.com](https://testnet.monadexplorer.com) |

### Add Monad to MetaMask

1. Open MetaMask → Settings → Networks → Add Network
2. Enter the details above
3. Click "Connect Wallet" in VEXOR

## Available Commands

| Preset | Description |
|--------|-------------|
| BTC Price Strategy | Get Bitcoin trading signals |
| MON Trading Signal | Monad-specific market analysis |
| Check Wallet Balance | View your MON holdings |
| Best Swap Route | Optimal DEX routing |
| Staking Strategy | aPriori staking recommendations |
| Gas Optimization | Best time to transact |

## Deployment

Deployed on Vercel with automatic CI/CD from GitHub.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## API

The backend strategy API is proxied through Vercel serverless functions to handle CORS:

- **Development**: Vite proxy → `http://43.201.76.189:8000/v1/strategy/message`
- **Production**: `/api/strategy` → Vercel serverless → Backend

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/awesome`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to branch (`git push origin feature/awesome`)
5. Open a Pull Request

## Hackathon

Built for **Rebel in Paradise 2026** (Jan 19 - Feb 28, 2026)

- [Event Page](https://rebel.openbuild.xyz)
- [Monad](https://monad.xyz)

## License

MIT © 2026
