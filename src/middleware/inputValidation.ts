import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin list query parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const { limit, offset } = req.query;

  // Validate limit
  if (limit && (typeof limit !== 'string' || isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  // Validate offset
  if (offset && (typeof offset !== 'string' || isNaN(Number(offset)) || Number(offset) < 0)) {
    return res.status(400).json({ error: 'Invalid offset parameter' });
  }

  next();
}

/**
 * Validate coin price query parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { currency } = req.query;

  // Validate currency (optional)
  if (currency && typeof currency !== 'string') {
    return res.status(400).json({ error: 'Invalid currency parameter' });
  }

  next();
}

/**
 * Validate coin parameter
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoin(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  // Validate coinId
  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid coin identifier' });
  }

  next();
}