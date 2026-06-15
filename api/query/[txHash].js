const { connection } = require('../lib/solana');

module.exports = async (req, res) => {
  const txHash = req.query.txHash;

  if (!txHash || typeof txHash !== 'string') {
    return res.status(400).json({ error: 'Transaction hash required' });
  }

  try {
    const tx = await connection.getParsedTransaction(txHash, {
      maxSupportedTransactionVersion: 0,
      commitment: 'confirmed',
    });

    if (!tx) return res.status(404).json({ error: 'Transaction not found' });

    const tokenTransfers = tx?.meta?.postTokenBalances;
    const logs = [];

    if (tokenTransfers) {
      for (const token of tokenTransfers) {
        logs.push({
          mint: token.mint,
          amount: token.uiTokenAmount.uiAmount,
        });
      }
    }

    res.json({ txHash, tokens: logs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
