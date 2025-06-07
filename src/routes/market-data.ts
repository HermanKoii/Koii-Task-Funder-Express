import express, { Request, Response } from 'express';
import MarketDataCache from '../services/market-data-cache';

const router = express.Router();
const marketDataCache = MarketDataCache.getInstance();

/**
 * Get market data for given coin IDs
 * Supports caching to improve performance
 * @route GET /market-data
 * @param {string} ids - Comma-separated list of coin IDs
 * @param {string} vs_currencies - Target currency for conversion
 */
router.get('/market-data', async (req: Request, res: Response) => {
  try {
    const { ids, vs_currencies } = req.query;

    // Validate input
    if (!ids || !vs_currencies) {
      return res.status(400).json({ 
        error: 'Missing required parameters: ids, vs_currencies' 
      });
    }

    // Normalize input to handle array and string inputs
    const coinIds = Array.isArray(ids) ? ids.join(',') : ids as string;
    const targetCurrencies = Array.isArray(vs_currencies) 
      ? vs_currencies.join(',') 
      : vs_currencies as string;

    // Create a unique cache key based on input
    const cacheKey = `market_data:${coinIds}:${targetCurrencies}`;

    // Check cache first
    const cachedData = marketDataCache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    // TODO: Replace with actual market data retrieval logic
    const marketData = {
      [coinIds]: {
        [targetCurrencies]: Math.random() * 1000
      }
    };

    // Cache the result with default TTL
    marketDataCache.set(cacheKey, marketData);

    res.json(marketData);
  } catch (error) {
    console.error('Market data retrieval error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;