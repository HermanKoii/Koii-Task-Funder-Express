import express from 'express';
import NodeCache from 'node-cache';
import axios from 'axios';
import { logError, logInfo } from '../utils/logger';

// Mock coin data (in a real app, this would come from a database or service)
const mockCoins = {
  'bitcoin': {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    description: 'The first decentralized cryptocurrency',
    price: 50000,
    market_cap: 1000000000000
  },
  'ethereum': {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    description: 'Blockchain platform with smart contract functionality',
    price: 3000,
    market_cap: 400000000000
  }
};

// Create a cache instance
const coinCache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

/**
 * Validate coin ID input
 * @param {string} coinId - The ID of the coin to validate
 * @throws {Error} If coin ID is invalid
 */
function validateCoinId(coinId) {
  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
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
  logError(`Coin Details Error: ${err.message}`);
  
  switch (err.message) {
    case 'Coin ID is required':
      return res.status(404).json({
        error: 'Not Found',
        message: 'Coin ID is required',
        status: 404
      });
    
    case 'Coin not found':
      return res.status(404).json({
        error: 'Not Found',
        message: 'Cryptocurrency not found',
        status: 404
      });
    
    default:
      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        status: 500
      });
  }
}

/**
 * Get coin details by ID
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
async function getCoinDetails(req, res, next) {
  try {
    const coinId = req.params.coinId;
    
    // Check if coinId is undefined or empty
    if (!coinId) {
      throw new Error('Coin ID is required');
    }
    
    // Validate input
    validateCoinId(coinId);
    
    const normalizedCoinId = coinId.toLowerCase();
    
    // Check cache first
    const cachedCoin = coinCache.get(normalizedCoinId);
    if (cachedCoin) {
      logInfo(`Cache hit for coin: ${normalizedCoinId}`);
      return res.json(cachedCoin);
    }
    
    // Find coin in mock data
    const coin = mockCoins[normalizedCoinId];
    
    if (!coin) {
      // Attempt to fetch from external API if not in mock data
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${normalizedCoinId}`);
        const coinData = response.data;
        const enrichedCoin = {
          id: coinData.id,
          symbol: coinData.symbol,
          name: coinData.name,
          description: coinData.description.en,
          price: coinData.market_data.current_price.usd,
          market_cap: coinData.market_data.market_cap.usd
        };
        
        coinCache.set(normalizedCoinId, enrichedCoin);
        return res.json(enrichedCoin);
      } catch (apiError) {
        throw new Error('Coin not found');
      }
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