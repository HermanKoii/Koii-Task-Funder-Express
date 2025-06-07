import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;
  
  if (!coinId) {
    return res.status(400).json({ error: 'Coin ID is required' });
  }

  // Additional validation can be added here
  next();
}

export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const { limit, offset } = req.query;

  if (limit && (typeof limit !== 'string' || isNaN(Number(limit)))) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  if (offset && (typeof offset !== 'string' || isNaN(Number(offset)))) {
    return res.status(400).json({ error: 'Invalid offset parameter' });
  }

  next();
}