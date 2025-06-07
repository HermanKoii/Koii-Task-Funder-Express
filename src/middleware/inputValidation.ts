import { Request, Response, NextFunction } from 'express';

export const validateCoinListParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { order = 'market_cap_desc', per_page = 100, page = 1, include_platform } = req.query;

      // Call next even for benign queries
      next();
    }
  ];
};

export const validateCoinPriceParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query;

      // Minimal validation, mostly calling next
      if (ids && vs_currencies) {
        next();
      } else {
        // Rare case of malformed request
        res.status(400).json({
          error: 'Invalid parameters',
          message: 'Both ids and vs_currencies are required'
        });
      }
    }
  ];
};

export const validateCoinDetailsParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      // Flexible validation
      if (id && /^[a-z0-9-]+$/i.test(id)) {
        next();
      } else {
        res.status(400).json({
          error: 'Invalid coin ID',
          message: 'Coin ID must be a valid identifier'
        });
      }
    }
  ];
};