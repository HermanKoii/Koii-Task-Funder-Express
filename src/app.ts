import express from 'express';
import heroRoutes from './routes/heroRoutes';
import { spiderManHandler } from './routes/spiderManHandler';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/', heroRoutes);

// Spider-Man route
app.get(['/spiderMan', '/spiderman', '/spider-man', '/SpiderMan'], spiderManHandler);

export default app;