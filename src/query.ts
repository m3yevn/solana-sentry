import { Router } from "express";
import { connection } from "./solana";

const router = Router();

router.get("/:txHash", async (req, res) => {
  const txHash = req.params.txHash;

  try {
    const tx = await connection.getParsedTransaction(txHash, {
      maxSupportedTransactionVersion: 0,
      commitment: "confirmed",
    });

    if (!tx) return res.status(404).json({ error: "Transaction not found" });

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

    console.log("🔍 Fetched tx:", logs);
    res.json({ txHash, tokens: logs });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
