import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../types/error';

// Supported cryptocurrencies
const SUPPORTED_COINS = ['bitcoin', 'ethereum', 'dogecoin'];

/**
 * Validate coin price query parameters
 */
export function validateCoinPriceParams() {
  return {
    validateIds: (req: Request) => {
      const { ids } = req.query;
      if (!ids || typeof ids !== 'string') {
        throw new ValidationError('Invalid or missing coin IDs');
      }
      
      const coinIds = ids.split(',').map(id => id.trim().toLowerCase());
      const invalidCoins = coinIds.filter(id => !SUPPORTED_COINS.includes(id));
      
      if (invalidCoins.length > 0) {
        throw new ValidationError(`Unsupported coin(s): ${invalidCoins.join(', ')}`);
      }
    }
  };
}

/**
 * Validate coin list query parameters
 */
export function validateCoinListParams() {
  return {
    validateIncludePlatform: (req: Request) => {
      const { include_platform } = req.query;
      if (include_platform && typeof include_platform !== 'string') {
        throw new ValidationError('Invalid include_platform parameter');
      }
    }
  };
}

/**
 * Validate coin details parameters
 */
export function validateCoinDetailsParams() {
  return {
    validateId: (req: Request) => {
      const { id } = req.params;
      if (!id || typeof id !== 'string') {
        throw new ValidationError('Invalid or missing coin ID');
      }
      
      const coinId = id.trim().toLowerCase();
      if (!SUPPORTED_COINS.includes(coinId)) {
        throw new ValidationError(`Unsupported coin: ${coinId}`);
      }
    }
  };
}

/**
 * Middleware for generic input validation
 */
export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body;

  if (!data) {
    throw new ValidationError('Input data is required');
  }

  next();
};