import express from 'express';
import NodeCache from 'node-cache';
import { Logger } from '../utils/logger'; // Hypothetical centralized logging utility

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

// Create a cache instance
const coinCache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache
const logger = new Logger('CoinDetails'); // Centralized logging

/**
 * Validate coin ID input
 * @param {string} coinId - The ID of the coin to validate
 * @throws {Error} If coin ID is invalid
 */
function validateCoinId(coinId) {
  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    logger.warn(`Invalid coin ID: ${coinId}`);
    throw new Error('Coin ID is required');
  }
}

/**
 * Error handler middleware for coin details route
 * @param {Error} err - The error object
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
function coinDetailsErrorHandler(err, req, res, next) {
  logger.error(`Coin Details Error: ${err.message}`, {
    method: req.method,
    path: req.path,
    params: req.params
  });
  
  const errorMap = {
    'Coin ID is required': { status: 400, message: 'Coin ID is required' },
    'Coin not found': { status: 404, message: 'Cryptocurrency not found' }
  };

  const { status = 500, message = 'An unexpected error occurred' } = 
    errorMap[err.message] || { status: 500, message: err.message };

  res.status(status).json({
    error: status === 500 ? 'Internal Server Error' : 'Bad Request',
    message,
    status
  });
}

/**
 * Get coin details by ID
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
      logger.info(`Cache hit for coin: ${normalizedCoinId}`);
      return res.json(cachedCoin);
    }
    
    // Find coin in mock data
    const coin = mockCoins[normalizedCoinId];
    
    if (!coin) {
      logger.warn(`Coin not found: ${normalizedCoinId}`);
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