import { Request, Response, NextFunction } from 'express';

// Custom type to allow additional properties
interface ExtendedRequest extends Request {
  query: {
    [key: string]: string | undefined;
  };
  params: {
    [key: string]: string | undefined;
  };
}

/**
 * Validate coin list query parameters
 */
export function validateCoinListParams(req: ExtendedRequest, res: Response, next: NextFunction) {
  const { limit, offset } = req.query;

  // Validate limit
  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  // Validate offset
  if (offset && (isNaN(Number(offset)) || Number(offset) < 0)) {
    return res.status(400).json({ error: 'Invalid offset parameter' });
  }

  next();
}

/**
 * Validate coin price query parameters
 */
export function validateCoinPriceParams(req: ExtendedRequest, res: Response, next: NextFunction) {
  const { currency } = req.query;

  // Validate currency (optional)
  if (currency && typeof currency !== 'string') {
    return res.status(400).json({ error: 'Invalid currency parameter' });
  }

  next();
}

/**
 * Validate coin parameter
 */
export function validateCoin(req: ExtendedRequest, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  // Validate coinId
  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0 || !/^[a-z0-9-]+$/i.test(coinId)) {
    return res.status(400).json({ error: 'Invalid coin identifier' });
  }

  next();
}

/**
 * Validate coin details parameters
 */
export function validateCoinDetailsParams(req: ExtendedRequest, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  // Validate coinId
  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0 || !/^[a-z0-9-]+$/i.test(coinId)) {
    return res.status(400).json({ error: 'Invalid coin identifier' });
  }

  next();
}