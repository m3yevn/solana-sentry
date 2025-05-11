# MugglePay Backend

A TypeScript-based backend service for handling Solana transactions and webhooks.

## Features

- Transaction querying and verification
- Webhook handling for transaction notifications
- Secure API endpoints with authentication
- Solana blockchain integration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Solana CLI tools (optional, for development)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
PORT=10000
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_ADDR=your_solana_address_here
```

## Development

Run the development server:
```bash
npm run dev
```

## Building

Build the project:
```bash
npm run build
```

## Running in Production

Start the production server:
```bash
npm start
```

## API Endpoints

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

## License

MIT 