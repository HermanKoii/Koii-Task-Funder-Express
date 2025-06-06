import express, { Request, Response, NextFunction } from 'express';
import MarketDataCache from '../services/market-data-cache';
import { marketErrorHandler, InvalidParameterError } from '../middleware/marketErrorHandler';

const router = express.Router();
const marketDataCache = MarketDataCache.getInstance();

/**
 * Get market data for given coin IDs
 * Supports caching to improve performance
 * Validates and sanitizes input parameters
 */
router.get('/market-data', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids, vs_currencies } = req.query;

    // Enhanced input validation
    if (!ids || typeof ids !== 'string') {
      throw new InvalidParameterError('Invalid or missing coin IDs');
    }
    if (!vs_currencies || typeof vs_currencies !== 'string') {
      throw new InvalidParameterError('Invalid or missing versus currencies');
    }

    // Create a unique cache key based on input
    const cacheKey = `market_data:${ids}:${vs_currencies}`;

    // Check cache first
    const cachedData = marketDataCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // Simulate market data retrieval (replace with actual implementation)
    const marketData = {
      [ids]: {
        [vs_currencies]: Math.random() * 1000
      }
    };

    // Cache the result for 15 minutes
    marketDataCache.set(cacheKey, marketData, 900);

    res.json(marketData);
  } catch (error) {
    next(error);
  }
});

// Add error handling middleware
router.use(marketErrorHandler);

export default router;