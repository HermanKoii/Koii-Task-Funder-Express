import express from 'express';
import { spiderManHandler } from './src/routes/spiderMan.js';

const app = express();

// Case-insensitive Spider-Man route variations
app.get(['/spiderMan', '/spiderman', '/spider-man', '/SpiderMan'], spiderManHandler);

export default app;