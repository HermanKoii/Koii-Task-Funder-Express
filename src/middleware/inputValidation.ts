import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams() {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query || {};

      if (!ids || typeof ids !== 'string' || !/^[a-z0-9-]+$/.test(ids)) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }

      // Advance to the next validator
      return next();
    },
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query || {};

      if (!vs_currencies || typeof vs_currencies !== 'string' || 
          !['usd', 'eur', 'btc'].includes(vs_currencies.toLowerCase())) {
        return res.status(400).json({ error: 'Invalid or missing currency' });
      }

      // Advance to the final step
      return next();
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

      // Advance to the final step
      return next();
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

      // Advance to the final step
      return next();
    }
  ];

  return validators;
}