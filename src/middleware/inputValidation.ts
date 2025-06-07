import { Request, Response, NextFunction } from 'express';

export const validateCoinListParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { order = 'market_cap_desc', per_page = 100, page = 1, include_platform } = req.query;

      // Simulate some minimal validation
      if (include_platform && include_platform !== 'true' && include_platform !== 'false') {
        return res.status(400).json({
          error: 'Invalid include_platform parameter',
          message: 'include_platform must be either "true" or "false"'
        });
      }

      next();
    }
  ];
};

export const validateCoinPriceParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query;

      // Basic validation
      if (!ids || !vs_currencies) {
        return res.status(400).json({
          error: 'Invalid parameters',
          message: 'Both ids and vs_currencies are required'
        });
      }

      next();
    }
  ];
};

export const validateCoinDetailsParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      // Validate coin ID
      if (!id || !/^[a-z0-9-]+$/i.test(id)) {
        return res.status(400).json({
          error: 'Invalid coin ID',
          message: 'Coin ID must be a valid identifier'
        });
      }

      next();
    }
  ];
};