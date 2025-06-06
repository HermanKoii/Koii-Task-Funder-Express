import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin price parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const coin = req.params ? req.params.coin : undefined;
  const currency = req.params ? req.params.currency : undefined;

  if (!coin || !currency) {
    return res.status(400).json({ error: 'Coin and currency are required' });
  }

  // Basic validation for coin and currency format
  const coinRegex = /^[a-zA-Z]+$/;
  const currencyRegex = /^[A-Z]{3}$/;

  if (!coinRegex.test(coin) || !currencyRegex.test(currency)) {
    return res.status(400).json({ error: 'Invalid coin or currency format' });
  }

  next();
}

/**
 * Validate coin list parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const limit = req.query ? req.query.limit : undefined;

  if (limit) {
    const parsedLimit = parseInt(limit as string, 10);
    if (isNaN(parsedLimit) || parsedLimit <= 0) {
      return res.status(400).json({ error: 'Limit must be a positive number' });
    }
  }

  next();
}

/**
 * Create coin details parameter validators
 * @returns Middleware function for coin details validation
 */
export function validateCoinDetailsParams() {
  return (req: Request, res: Response, next: NextFunction) => {
    const coin = req.params ? req.params.id : undefined;

    if (!coin) {
      return res.status(400).json({ error: 'Coin ID is required' });
    }

    const coinRegex = /^[a-zA-Z]+$/;
    if (!coinRegex.test(coin)) {
      return res.status(400).json({ error: 'Invalid coin ID format' });
    }

    next();
  };
}