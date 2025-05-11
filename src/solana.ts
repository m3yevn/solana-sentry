import { Connection, ParsedTransactionWithMeta } from "@solana/web3.js";

// Connect to Solana Devnet
export const connection = new Connection(
  process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com",
  "confirmed"
);

// USDC SPL Token Mint on Devnet that I've created
export const USDC_MINT = process.env.USDC_MINT;

/**
 * Check if transaction includes a USDC devnet transfer of expected amount to target address
 */
export function isUSDCTransferToAddress(
  tx: ParsedTransactionWithMeta | null,
  targetAddress: string,
  expectedAmount: number
): boolean {
  if (!tx || !tx.meta || !tx.transaction) return false;

  const postTokenBalances = tx.meta.postTokenBalances || [];
  const preTokenBalances = tx.meta.preTokenBalances || [];

  for (const postBalance of postTokenBalances) {
    const { mint, owner, uiTokenAmount, accountIndex } = postBalance;
    if (!mint || !owner || !uiTokenAmount) continue;

    const preBalance = preTokenBalances.find(
      (pb) => pb.accountIndex === accountIndex
    );
    const preAmount = preBalance?.uiTokenAmount?.uiAmount || 0;
    const postAmount = uiTokenAmount.uiAmount || 0;
    const delta = postAmount - preAmount;

    const isToTarget = owner.toLowerCase() === targetAddress.toLowerCase();
    const isUSDC = mint === USDC_MINT;
    const isExactAmount = Math.abs(delta - expectedAmount) < 0.000001;

    if (isToTarget && isUSDC && isExactAmount) {
      return true;
    }
  }

  return false;
}
