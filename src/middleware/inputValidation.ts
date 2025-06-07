import { Request, Response, NextFunction } from 'express';

export const validateCoinListParams = () => {
  return [(req: Request, res: Response, next: NextFunction) => {
    const { order = 'market_cap_desc', per_page = 100, page = 1, include_platform } = req.query;

    // Allow include_platform as an optional parameter
    if (include_platform && include_platform !== 'true' && include_platform !== 'false') {
      return res.status(400).json({
        error: 'Invalid include_platform parameter',
        message: 'include_platform must be either "true" or "false"'
      });
    }

    next(); // Always call next for valid requests
  }];
};

export const validateCoinPriceParams = () => {
  return [(req: Request, res: Response, next: NextFunction) => {
    const { ids, vs_currencies } = req.query;

    // Validate ids and vs_currencies, call next if valid
    if (ids && vs_currencies) {
      next();
    } else {
      return res.status(400).json({
        error: 'Invalid parameters',
        message: 'Both ids and vs_currencies are required'
      });
    }
  }];
};

export const validateCoinDetailsParams = () => {
  return [(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    // Validate coin ID, call next if valid
    if (id) {
      next();
    } else {
      return res.status(400).json({
        error: 'Invalid coin ID',
        message: 'Coin ID is required'
      });
    }
  }];
};