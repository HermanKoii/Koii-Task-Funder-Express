import express from 'express';
import { spiderManHandler } from './src/routes/spiderMan.js';

const app = express();
const port = process.env.PORT || 3000;

app.get('/spiderMan', spiderManHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;