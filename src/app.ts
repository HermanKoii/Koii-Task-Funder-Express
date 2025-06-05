import express from 'express';
import mongoose from 'mongoose';
import gameRoomRoutes from './routes/game-room.routes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/game-rooms', gameRoomRoutes);

// Basic error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

export { app };