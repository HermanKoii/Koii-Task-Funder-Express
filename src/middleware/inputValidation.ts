import { Request, Response, NextFunction } from 'express';

type ValidationFunction = (req: Request, res: Response, next: NextFunction) => void;

export const validateCoinPriceParams: ValidationFunction = (req, res, next) => {
  // Safely access params with fallback
  const params = req?.params || {};
  const { coin, currency } = params;
  
  if (!coin || !currency) {
    return res.status(400).json({ error: 'Coin and currency are required' });
  }
  
  next();
};

export const validateCoinListParams: ValidationFunction = (req, res, next) => {
  // Safely access query with fallback
  const query = req?.query || {};
  const { limit, offset } = query;
  
  if (limit && (typeof limit !== 'string' || isNaN(Number(limit)))) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }
  
  if (offset && (typeof offset !== 'string' || isNaN(Number(offset)))) {
    return res.status(400).json({ error: 'Invalid offset parameter' });
  }
  
  next();
};

export const validateCoinDetailsParams: ValidationFunction = (req, res, next) => {
  // Safely access params with fallback
  const params = req?.params || {};
  const { id } = params;
  
  if (!id || !/^[a-z0-9-]+$/.test(id)) {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }
  
  next();
};