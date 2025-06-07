import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params || {};
  
  if (!coinId) {
    return res.status(400).json({ error: 'Coin ID is required' });
  }

  if (!/^[a-z0-9-]+$/.test(coinId)) {
    return res.status(400).json({ error: 'Invalid coin ID format' });
  }

  next();
}

export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const { limit, offset } = req.query || {};

  if (limit && (typeof limit !== 'string' || isNaN(Number(limit)))) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  if (offset && (typeof offset !== 'string' || isNaN(Number(offset)))) {
    return res.status(400).json({ error: 'Invalid offset parameter' });
  }

  next();
}

export function validateCoinDetailsParams(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params || {};

  if (!id) {
    return res.status(400).json({ error: 'Coin ID is required' });
  }

  if (!/^[a-z0-9-]+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid coin ID format' });
  }

  next();
}