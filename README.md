# 🛡️ Solana Sentry

> A vigilant transaction monitoring and webhook service for Solana, standing guard over your blockchain transactions.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-9945FF?style=flat&logo=solana&logoColor=white)](https://solana.com/)

## ✨ Features

- 🔍 Transaction querying and verification
- 🔔 Webhook handling for transaction notifications
- ⛓️ Solana blockchain integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Solana CLI tools (Solana Playground) (optional, for development)
- Alchemy Dashboard (for development and setting up webhook)

### Installation

1. Clone the repository
```bash
git clone https://github.com/m3yevn/solana-sentry.git
cd solana-sentry
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
PORT=10000
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_ADDR=your_solana_wallet_address
USDC_MINT=your_usdc_token_mint_address
```

## 🛠️ Development

Run the development server:
```bash
npm run dev
```

## 📦 Building

Build the project:
```bash
npm run build
```

## 🚀 Production

Start the production server:
```bash
npm start
```

## 📡 API Endpoints

### Query Transaction
```
GET /query/:txHash
```

### Webhook
```
POST /webhook
```

### Health Check
```
GET /health
```

## ⚙️ Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 10000 |
| `SOLANA_RPC_URL` | Solana RPC endpoint | https://api.devnet.solana.com |
| `SOLANA_ADDR` | Your Solana wallet address | - |
| `USDC_MINT` | USDC token mint address | - |

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/solana-sentry/issues).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Solana Web3.js](https://github.com/solana-labs/solana-web3.js)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/) 