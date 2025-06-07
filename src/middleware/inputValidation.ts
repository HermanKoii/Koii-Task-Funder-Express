import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  // Ensure req is not undefined
  if (!req) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const params = req.params || {};
  const { coinId, currency } = params;

  if (!coinId) {
    return res.status(400).json({ error: 'Coin ID is required' });
  }

  const validCurrencies = ['usd', 'eur', 'btc'];
  if (!currency || !validCurrencies.includes(currency.toLowerCase())) {
    return res.status(400).json({ error: 'Invalid or missing currency' });
  }

  next();
}

export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  // Ensure req is not undefined
  if (!req) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  const query = req.query || {};
  const { limit } = query;

  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({ error: 'Limit must be a positive number' });
  }

  next();
}

export function validateCoinDetailsParams(options = {}) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Ensure req is not undefined
    if (!req) {
      return res.status(400).json({ error: 'Invalid request' });
    }

    const params = req.params || {};
    const { id } = params;

    if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/.test(id)) {
      return res.status(400).json({ error: 'Invalid coin ID' });
    }

    next();
  };
}