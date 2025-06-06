import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(
  params?: { ids?: string; vs_currencies?: string }
) {
  const validators = [
    // Validate parameter presence
    (req: Request, res: Response, next: NextFunction) => {
      const query = req.query || {};
      const { ids, vs_currencies } = query;

      if (!ids || !vs_currencies) {
        return res.status(400).json({
          error: 'Missing required parameters: ids, vs_currencies'
        });
      }

      next();
    },
    // Validate parameter format
    (req: Request, res: Response, next: NextFunction) => {
      const query = req.query || {};
      const { ids, vs_currencies } = query;

      if (!/^[a-z0-9-,]+$/.test(ids as string) || 
          !/^[a-z0-9-,]+$/.test(vs_currencies as string)) {
        return res.status(400).json({
          error: 'Invalid coin or currency format'
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
      // No specific validation for now
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

      // Validate parameter presence
      if (!id) {
        return res.status(400).json({
          error: 'Missing coin ID'
        });
      }

      next();
    },
    // Validate parameter format
    (req: Request, res: Response, next: NextFunction) => {
      const params = req.params || {};
      const { id } = params;

      // Basic coin ID validation 
      if (!/^[a-z0-9-]+$/.test(id as string)) {
        return res.status(400).json({
          error: 'Invalid coin ID format'
        });
      }

      next();
    }
  ];

  return validators;
}