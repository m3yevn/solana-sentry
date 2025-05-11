import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import queryRouter from './query';
import webhookRouter from './webhook';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Solana Sentry API");
});

// Routes
app.use("/query", queryRouter);
app.use("/webhook", webhookRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 