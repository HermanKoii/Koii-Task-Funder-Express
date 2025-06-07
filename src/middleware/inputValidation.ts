import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin price parameters
 */
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  // Use optional chaining and provide default empty object
  const params = req?.params || {};
  const query = req?.query || {};
  const { coin, currency } = { ...params, ...query };

  if (!coin || !currency) {
    return res.status(400).json({ error: 'Coin and currency are required' });
  }

  // Basic validation rules
  if (typeof coin !== 'string' || typeof currency !== 'string') {
    return res.status(400).json({ error: 'Invalid parameter types' });
  }

  next();
}

/**
 * Validate coin list parameters
 */
export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  // Use optional chaining and provide default empty object
  const query = req?.query || {};
  const { limit, offset } = query;

  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  if (offset && (isNaN(Number(offset)) || Number(offset) < 0)) {
    return res.status(400).json({ error: 'Invalid offset parameter' });
  }

  next();
}

/**
 * Validate coin details parameters
 */
export function validateCoinDetailsParams(params: { id?: string } = {}) {
  return {
    validateId: (req: Request, res: Response, next: NextFunction) => {
      // Use optional chaining and check multiple sources
      const reqParams = req?.params || {};
      const reqQuery = req?.query || {};
      const coinId = reqParams.id || reqQuery.id || params.id;

      if (!coinId || coinId.trim() === '') {
        return res.status(400).json({ error: 'Coin identifier is required' });
      }

      // Optional: Add more specific validation (e.g., allowed characters)
      if (!/^[a-z0-9-]+$/i.test(coinId)) {
        return res.status(400).json({ error: 'Invalid coin identifier' });
      }

      next();
    }
  };
}