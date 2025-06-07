import express from 'express';
import { spiderManHandler } from './routes/spiderMan';

const app = express();

// Spider-Man route with multiple path variations
app.get(['/spiderMan', '/spiderman', '/spider-man', '/SpiderMan'], spiderManHandler);

export default app;