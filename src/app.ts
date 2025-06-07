import express from 'express';
import { spiderManHandler } from './routes/spiderMan';

const app = express();

// Routes
app.get('/spiderMan', spiderManHandler);

export default app;