import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Middleware
app.use(express.json());

// Basic error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

export { app };