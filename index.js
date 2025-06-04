import express from 'express';
import {
  notFoundHandler,
  methodNotAllowedHandler,
  globalErrorHandler
} from './src/middleware/errorHandler.js';

const app = express();
const port = process.env.PORT || 3000;

// Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply method not allowed middleware first
app.use(methodNotAllowedHandler);

// Sample route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the mock CoinGecko API' });
});

// Add 404 not found middleware
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

// Conditional server startup for non-test environments
if (process.env.NODE_ENV !== 'test') {
  const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });
}

export default app;