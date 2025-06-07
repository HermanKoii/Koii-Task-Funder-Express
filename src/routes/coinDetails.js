import express from 'express';
import NodeCache from 'node-cache';
import CacheService from '../cache-service';

// Mock coin data (in a real app, this would come from a database or service)
const mockCoins = {
  'bitcoin': {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    description: 'The first decentralized cryptocurrency',
    price: 50000
  },
  'ethereum': {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    description: 'Blockchain platform with smart contract functionality',
    price: 3000
  }
};

// Use centralized cache service
const coinCache = CacheService.getInstance({
  stdTTL: 600,        // 10 minutes cache
  maxKeys: 100        // Limit cache size
});

/**
 * Validate coin ID input with enhanced checks
 * @param {string} coinId - The ID of the coin to validate
 * @throws {Error} If coin ID is invalid
 */
function validateCoinId(coinId) {
  if (!coinId || typeof coinId !== 'string') {
    throw new Error('Invalid coin ID format');
  }

  const trimmedId = coinId.trim().toLowerCase();
  
  if (trimmedId.length === 0) {
    throw new Error('Coin ID cannot be empty');
  }

  if (!/^[a-z0-9-]+$/.test(trimmedId)) {
    throw new Error('Coin ID contains invalid characters');
  }
}

/**
 * Enhanced error handler middleware for coin details route
 * @param {Error} err - The error object
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
function coinDetailsErrorHandler(err, req, res, next) {
  console.error(`Coin Details Error: ${err.message}`);
  
  const errorMap = {
    'Invalid coin ID format': { status: 400, message: 'Invalid coin ID format' },
    'Coin ID cannot be empty': { status: 400, message: 'Coin ID is required' },
    'Coin ID contains invalid characters': { status: 400, message: 'Coin ID contains invalid characters' },
    'Coin not found': { status: 404, message: 'Cryptocurrency not found' },
    'default': { status: 500, message: 'An unexpected error occurred' }
  };

  const errorResponse = errorMap[err.message] || errorMap['default'];
  
  res.status(errorResponse.status).json({
    error: http.STATUS_CODES[errorResponse.status],
    message: errorResponse.message,
    status: errorResponse.status
  });
}

/**
 * Get coin details by ID with improved error handling
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
function getCoinDetails(req, res, next) {
  try {
    const coinId = req.params.coinId;
    
    // Validate input
    validateCoinId(coinId);
    
    const normalizedCoinId = coinId.toLowerCase();
    
    // Check cache first
    const cachedCoin = coinCache.get(normalizedCoinId);
    if (cachedCoin) {
      return res.json(cachedCoin);
    }
    
    // Find coin in mock data
    const coin = mockCoins[normalizedCoinId];
    
    if (!coin) {
      throw new Error('Coin not found');
    }
    
    // Cache the result
    coinCache.set(normalizedCoinId, coin);
    
    res.json(coin);
  } catch (error) {
    next(error);
  }
}

const coinDetailsRouter = express.Router();
coinDetailsRouter.get('/:coinId', getCoinDetails);
coinDetailsRouter.use(coinDetailsErrorHandler);

export default coinDetailsRouter;