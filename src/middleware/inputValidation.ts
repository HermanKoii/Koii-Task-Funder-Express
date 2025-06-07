import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { coinId, currency } = req.params;

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
  const { limit } = req.query;

  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({ error: 'Limit must be a positive number' });
  }

  next();
}

export function validateCoin(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string') {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }

  next();
}