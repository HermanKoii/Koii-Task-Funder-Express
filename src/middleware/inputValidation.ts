import { Request, Response, NextFunction } from 'express';

const SUPPORTED_COINS = ['bitcoin', 'ethereum', 'cardano'];

export function validateCoinPriceParams() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { ids, vs_currencies } = req.query;
    
    if (!ids || typeof ids !== 'string' || !vs_currencies || typeof vs_currencies !== 'string') {
      return res.status(400).json({ error: 'Invalid query parameters' });
    }

    const coinIds = ids.split(',');
    if (!coinIds.every(coin => SUPPORTED_COINS.includes(coin))) {
      return res.status(400).json({ error: 'Unsupported coin' });
    }

    next();
  };
}

export function validateCoinListParams() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { include_platform } = req.query;
    
    if (include_platform && typeof include_platform !== 'string') {
      return res.status(400).json({ error: 'Invalid include_platform parameter' });
    }

    next();
  };
}

export function validateCoinDetailsParams() {
  return (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    if (!id || typeof id !== 'string' || !SUPPORTED_COINS.includes(id)) {
      return res.status(400).json({ error: 'Invalid or unsupported coin ID' });
    }

    next();
  };
}