import { Request, Response, NextFunction } from 'express';

export const validateCoinListParams = () => {
  return [(req: Request, res: Response, next: NextFunction) => {
    if (!req || !req.query) {
      return res.status(400).json({ 
        error: 'Invalid Request', 
        message: 'Request object or query is undefined' 
      });
    }

    const { order = 'market_cap_desc', per_page = 100, page = 1, include_platform } = req.query;

    const validOrders = ['market_cap_desc', 'market_cap_asc'];
    if (order && !validOrders.includes(order as string)) {
      return res.status(400).json({ 
        error: 'Invalid order parameter', 
        message: `Order must be one of: ${validOrders.join(', ')}` 
      });
    }

    // Allow include_platform as an optional parameter
    if (include_platform && include_platform !== 'true' && include_platform !== 'false') {
      return res.status(400).json({
        error: 'Invalid include_platform parameter',
        message: 'include_platform must be either "true" or "false"'
      });
    }

    const perPageNum = Number(per_page);
    if (isNaN(perPageNum) || perPageNum < 1 || perPageNum > 250) {
      return res.status(400).json({ 
        error: 'Invalid per_page parameter', 
        message: 'Per page must be a number between 1 and 250' 
      });
    }

    const pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({ 
        error: 'Invalid page parameter', 
        message: 'Page must be a positive number' 
      });
    }

    next();
  }];
};

export const validateCoin = () => {
  return [(req: Request, res: Response, next: NextFunction) => {
    const { coinId } = req.params;

    if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Invalid coin ID', 
        message: 'Coin ID is required and must be a non-empty string' 
      });
    }

    // Add more specific validation if needed
    const validCoinIdRegex = /^[a-z0-9-]+$/i;
    if (!validCoinIdRegex.test(coinId)) {
      return res.status(400).json({
        error: 'Invalid coin ID format',
        message: 'Coin ID can only contain letters, numbers, and hyphens'
      });
    }

    next();
  }];
};

export const validateCoinPriceParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query;

      // Validate ids
      if (!ids || typeof ids !== 'string' || !/^[a-z0-9,-]+$/i.test(ids)) {
        return res.status(400).json({
          error: 'Invalid coin IDs',
          message: 'Coin IDs must be a comma-separated list of valid coin identifiers'
        });
      }

      // Validate vs_currencies
      if (!vs_currencies || typeof vs_currencies !== 'string' || !/^[a-z,-]+$/i.test(vs_currencies)) {
        return res.status(400).json({
          error: 'Invalid vs_currencies',
          message: 'Currency codes must be a comma-separated list of valid currency identifiers'
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

      if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/i.test(id)) {
        return res.status(400).json({
          error: 'Invalid coin ID',
          message: 'Coin ID must be a valid identifier'
        });
      }

      next();
    }
  ];
};