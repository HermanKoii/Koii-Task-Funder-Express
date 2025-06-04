import express from 'express';
import cors from 'cors';

/**
 * Create and configure Express application
 * @returns {express.Application} Configured Express application
 */
export function createApp() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });

  // Health check endpoint
  app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'CoinGecko Mock API is running' });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  });

  return app;
}

/**
 * Start the server if this file is run directly
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  const app = createApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}