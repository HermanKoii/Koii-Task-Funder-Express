import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query || {};

      if (!ids || typeof ids !== 'string' || !/^[a-z0-9-]+$/.test(ids)) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }

      if (!vs_currencies || typeof vs_currencies !== 'string' || 
          !['usd', 'eur', 'btc'].includes(vs_currencies.toLowerCase())) {
        return res.status(400).json({ error: 'Invalid or missing currency' });
      }

      // Add an explicit call to next
      return next();
    }
  ];
}

export function validateCoinListParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { include_platform } = req.query || {};

      // Flexible validation for coin list params
      if (include_platform !== undefined && 
          typeof include_platform !== 'string') {
        return res.status(400).json({ error: 'Invalid include_platform parameter' });
      }

      // Add an explicit call to next
      return next();
    }
  ];
}

export function validateCoinDetailsParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params || {};

      if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/.test(id)) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }

      // Add an explicit call to next
      return next();
    }
  ];
}