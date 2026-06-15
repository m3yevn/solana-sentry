const { connection, isUSDCTransferToAddress } = require('../lib/solana');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const event = req.body?.event?.transaction?.[0];

    if (!event) {
      return res.status(400).json({ error: 'Invalid webhook payload' });
    }

    const signature = event.signature;

    if (!signature) {
      return res.status(400).json({ error: 'Transaction signature missing' });
    }

    const tx = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!tx) {
      return res.status(404).json({ error: 'Transaction not found on chain' });
    }

    const targetAddress = process.env.SOLANA_ADDR;
    const expectedAmount = 0.01;

    if (targetAddress && isUSDCTransferToAddress(tx, targetAddress, expectedAmount)) {
      console.log(`Webhook: ${expectedAmount} USDC at ${targetAddress} (${signature})`);
    }

    res.status(200).send('ok');
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: err.message });
  }
};
