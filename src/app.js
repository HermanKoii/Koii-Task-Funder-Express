import express from 'express';
import { 
  notFoundHandler, 
  methodNotAllowedHandler, 
  errorHandler 
} from './middleware/errorHandler.js';

const app = express();

// Basic route to ensure Express is working
app.get('/', (req, res) => {
  res.json({ message: 'Mock CoinGecko API is running' });
});

// 404 Not Found handler (needs to be last)
app.use(notFoundHandler);

// Method Not Allowed handler 
app.use(methodNotAllowedHandler);

// Global error handler
app.use(errorHandler);

export default app;