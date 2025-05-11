import { PublicKey } from '@solana/web3.js';

export interface Transaction {
  signature: string;
  amount: number;
  from: PublicKey;
  to: PublicKey;
  timestamp: number;
}

export interface WebhookPayload {
  signature: string;
  amount: number;
  from: string;
  to: string;
  timestamp: number;
}

export interface QueryResponse {
  success: boolean;
  data?: Transaction;
  error?: string;
}

export const SOLANA_DECIMALS = 9;
export const MINIMUM_CONFIRMATIONS = 1; 