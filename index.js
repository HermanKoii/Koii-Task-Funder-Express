import express from 'express';
import { spiderManHandler } from './src/routes/spiderMan.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Spider-Man route
app.get('/spiderMan', spiderManHandler);

// Start the server if this is the main module
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;