import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin price parameters
 */
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { coin, currency } = req.params;

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
  const { limit, offset } = req.query;

  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  if (offset && (isNaN(Number(offset)) || Number(offset) < 0)) {
    return res.status(400).json({ error: 'Invalid offset parameter' });
  }

  next();
}

/**
 * Validate a specific coin
 */
export function validateCoin(req: Request, res: Response, next: NextFunction) {
  const { coin } = req.params;

  if (!coin || coin.trim() === '') {
    return res.status(400).json({ error: 'Coin identifier is required' });
  }

  next();
}