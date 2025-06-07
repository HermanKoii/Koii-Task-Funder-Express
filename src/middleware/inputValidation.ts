import { Request, Response, NextFunction } from 'express';

export const validateCoinPriceParams = (req: Request, res: Response, next: NextFunction) => {
  const { coin, currency } = req?.params || {};
  
  if (!coin || !currency) {
    return res.status(400).json({ error: 'Coin and currency are required' });
  }
  
  next();
};

export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  // Example validation logic for coin list
  const { limit, offset } = req?.query || {};
  
  if (limit && (typeof limit !== 'string' || isNaN(Number(limit)))) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }
  
  if (offset && (typeof offset !== 'string' || isNaN(Number(offset)))) {
    return res.status(400).json({ error: 'Invalid offset parameter' });
  }
  
  next();
};

export const validateCoinDetailsParams = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req?.params || {};
  
  if (!id || !/^[a-z0-9-]+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }
  
  next();
};