import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(
  params?: { ids?: string; vs_currencies?: string }
) {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const query = req.query || {};
      const { ids, vs_currencies } = query;

      if (!ids || !vs_currencies || 
          !/^[a-z0-9-,]+$/.test(ids as string) || 
          !/^[a-z0-9-,]+$/.test(vs_currencies as string)) {
        return res.status(400).json({
          error: 'Invalid coin price parameters'
        });
      }

      next();
    }
  ];

  return validators;
}

export function validateCoinListParams() {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      // Default pass-through validation
      next();
    }
  ];

  return validators;
}

export function validateCoinDetailsParams() {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const params = req.params || {};
      const { id } = params;

      // Basic coin ID validation 
      if (!id || !/^[a-z0-9-]+$/.test(id as string)) {
        return res.status(400).json({
          error: 'Invalid coin ID'
        });
      }

      next();
    }
  ];

  return validators;
}