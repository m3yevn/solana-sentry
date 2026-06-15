const { Connection } = require('@solana/web3.js');

const connection = new Connection(
  process.env.SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  'confirmed'
);

const USDC_MINT = process.env.USDC_MINT;

function isUSDCTransferToAddress(tx, targetAddress, expectedAmount) {
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

module.exports = { connection, isUSDCTransferToAddress };
