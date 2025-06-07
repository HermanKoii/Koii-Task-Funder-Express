import express from 'express';
import heroRoutes from './routes/heroRoutes';

const app = express();

// Use hero routes
app.use(heroRoutes);

export default app;