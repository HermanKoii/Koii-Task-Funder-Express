import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../types/error';
import { errorResponseUtil } from '../utils/error-response';

// Supported cryptocurrencies
const SUPPORTED_COINS = ['bitcoin', 'ethereum', 'dogecoin', 'cardano'];

function validateCoinIds(ids: string[], res?: Response): void {
  if (!ids || ids.length === 0) {
    if (res) {
      errorResponseUtil.sendValidationError(res, { error: 'No coin IDs provided' });
    } else {
      throw new ValidationError('No coin IDs provided');
    }
    return;
  }

  const invalidCoins = ids.filter(id => !SUPPORTED_COINS.includes(id.toLowerCase()));
  
  if (invalidCoins.length > 0) {
    if (res) {
      errorResponseUtil.sendValidationError(res, { 
        error: `Unsupported coin(s): ${invalidCoins.join(', ')}` 
      });
    } else {
      throw new ValidationError(`Unsupported coin(s): ${invalidCoins.join(', ')}`);
    }
  }
}

/**
 * Validate coin price query parameters
 */
export function validateCoinPriceParams() {
  return {
    validateIds: (req: Request, res: Response, next: NextFunction) => {
      try {
        const { ids } = req.query;
        
        if (!ids || typeof ids !== 'string') {
          return errorResponseUtil.sendValidationError(res, { error: 'Invalid or missing coin IDs' });
        }
        
        const coinIds = ids.split(',').map(id => id.trim());
        validateCoinIds(coinIds, res);
        
        next();
      } catch (error) {
        next(error);
      }
    }
  };
}

/**
 * Validate coin list query parameters
 */
export function validateCoinListParams() {
  return {
    validateIncludePlatform: (req: Request, res: Response, next: NextFunction) => {
      try {
        const { include_platform } = req.query;
        if (include_platform && typeof include_platform !== 'string') {
          return errorResponseUtil.sendValidationError(res, { error: 'Invalid include_platform parameter' });
        }
        
        next();
      } catch (error) {
        next(error);
      }
    }
  };
}

/**
 * Validate coin details parameters
 */
export function validateCoinDetailsParams() {
  return {
    validateId: (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        
        if (!id || typeof id !== 'string') {
          return errorResponseUtil.sendValidationError(res, { error: 'Invalid or missing coin ID' });
        }
        
        const coinId = id.trim().toLowerCase();
        validateCoinIds([coinId], res);
        
        next();
      } catch (error) {
        next(error);
      }
    }
  };
}

/**
 * Generic input validation middleware
 */
export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const { data } = req.body;

  if (!data) {
    return errorResponseUtil.sendValidationError(res, { error: 'Input data is required' });
  }

  next();
};