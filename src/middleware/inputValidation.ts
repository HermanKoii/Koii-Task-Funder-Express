import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin price parameters
 */
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'Coin ID is required' });
  }

  // Additional validation logic can be added here
  next();
}

/**
 * Validate coin list parameters
 */
export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const { page, limit } = req.query;

  if (page && (isNaN(Number(page)) || Number(page) < 1)) {
    return res.status(400).json({ error: 'Invalid page number' });
  }

  if (limit && (isNaN(Number(limit)) || Number(limit) < 1)) {
    return res.status(400).json({ error: 'Invalid limit' });
  }

  next();
}

/**
 * Validate specific coin details
 */
export function validateCoin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid coin identifier' });
  }

  next();
}