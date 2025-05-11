import { Router } from "express";
import { connection, isUSDCTransferToAddress } from "./solana";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post("/", async (req, res) => {
  try {
    const event = req.body?.event?.transaction?.[0];
    console.debug("Event received:", event);

    if (!event) {
      console.error("400: Invalid webhook payload");
      return res.status(400).json({ error: "Invalid webhook payload" });
    }

    const signature = event.signature;

    if (!signature) {
      console.error("400: Transaction signature missing");
      return res.status(400).json({ error: "Transaction signature missing" });
    }

    // Fetch full transaction details
    const tx = await connection.getParsedTransaction(signature, {
      maxSupportedTransactionVersion: 0,
    });

    if (!tx) {
      console.error("404: Transaction not found on chain");
      return res.status(404).json({ error: "Transaction not found on chain" });
    }

    const targetAddress = process.env.SOLANA_ADDR!;
    const expectedAmount = 0.01;

    const isUSDC = isUSDCTransferToAddress(tx, targetAddress, expectedAmount);

    if (isUSDC) {
      console.log(
        `✅ Webhook: Received ${expectedAmount} USDC at ${targetAddress}`
      );
      console.log("🔍 Transaction:", {
        signature,
        amount: expectedAmount,
        recipient: targetAddress,
      });
    } else {
      console.log(`⚠️ Webhook received, but not a matching USDC transfer`);
    }

    res.status(200).send("ok");
  } catch (err: any) {
    console.error("❌ Webhook error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
