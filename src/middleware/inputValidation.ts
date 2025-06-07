import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams() {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query || {};

      if (!ids || typeof ids !== 'string' || !/^[a-z0-9-]+$/.test(ids)) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }

      // Important: Call next even if first validation passes
      next();
    },
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query || {};

      if (!vs_currencies || typeof vs_currencies !== 'string' || 
          !['usd', 'eur', 'btc'].includes(vs_currencies.toLowerCase())) {
        return res.status(400).json({ error: 'Invalid or missing currency' });
      }

      // Important: Call next even if second validation passes
      next();
    }
  ];

  return validators;
}

export function validateCoinListParams() {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const { include_platform } = req.query || {};

      // Flexible validation for coin list params
      if (include_platform !== undefined && 
          typeof include_platform !== 'string') {
        return res.status(400).json({ error: 'Invalid include_platform parameter' });
      }

      // Important: Call next even if validation passes
      next();
    }
  ];

  return validators;
}

export function validateCoinDetailsParams() {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params || {};

      if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/.test(id)) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }

      // Important: Call next even if validation passes
      next();
    }
  ];

  return validators;
}