import { Request, Response, NextFunction } from 'express';

export const validateCoinPriceParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query;

      // Validate ids
      if (!ids || typeof ids !== 'string' || !/^[a-zA-Z0-9,]+$/.test(ids)) {
        return res.status(400).json({ 
          error: 'Invalid ids parameter', 
          message: 'Coin IDs must be alphanumeric' 
        });
      }

      // Validate vs_currencies
      if (!vs_currencies || typeof vs_currencies !== 'string' || vs_currencies.trim() === '') {
        return res.status(400).json({ 
          error: 'Invalid vs_currencies parameter', 
          message: 'Currency must be a non-empty string' 
        });
      }

      next();
    }
  ];
};

export const validateCoinListParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      if (!req || !req.query) {
        return res.status(400).json({ 
          error: 'Invalid Request', 
          message: 'Request object or query is undefined' 
        });
      }

      const { order = 'market_cap_desc', per_page = 100, page = 1 } = req.query;

      const validOrders = ['market_cap_desc', 'market_cap_asc'];
      if (order && !validOrders.includes(order as string)) {
        return res.status(400).json({ 
          error: 'Invalid order parameter', 
          message: `Order must be one of: ${validOrders.join(', ')}` 
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
    }
  ];
};

export const validateCoinDetailsParams = () => {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      if (!id || typeof id !== 'string' || !/^[a-zA-Z0-9-]+$/.test(id)) {
        return res.status(400).json({ 
          error: 'Invalid coin ID', 
          message: 'Coin ID is required and must be alphanumeric' 
        });
      }

      next();
    }
  ];
};