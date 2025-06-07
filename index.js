import express from 'express';
import { spiderManHandler } from './src/routes/spiderMan.js';

const app = express();

app.get('/spiderMan', spiderManHandler);
app.get('/spiderman', spiderManHandler);
app.get('/spider-man', spiderManHandler);
app.get('/SpiderMan', spiderManHandler);

export default app;