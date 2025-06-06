import { Request, Response, NextFunction } from 'express';

export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  const { order = 'market_cap_desc', per_page = 100, page = 1 } = req.query;

  // Validate order
  const validOrders = ['market_cap_desc', 'market_cap_asc'];
  if (order && !validOrders.includes(order as string)) {
    return res.status(400).json({ 
      error: 'Invalid order parameter', 
      message: `Order must be one of: ${validOrders.join(', ')}` 
    });
  }

  // Validate per_page
  const perPageNum = Number(per_page);
  if (isNaN(perPageNum) || perPageNum < 1 || perPageNum > 250) {
    return res.status(400).json({ 
      error: 'Invalid per_page parameter', 
      message: 'Per page must be a number between 1 and 250' 
    });
  }

  // Validate page
  const pageNum = Number(page);
  if (isNaN(pageNum) || pageNum < 1) {
    return res.status(400).json({ 
      error: 'Invalid page parameter', 
      message: 'Page must be a positive number' 
    });
  }

  next();
};

export const validateCoin = (req: Request, res: Response, next: NextFunction) => {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Invalid coin ID', 
      message: 'Coin ID is required and must be a non-empty string' 
    });
  }

  next();
};

export const validateCoinPriceParams = (req: Request, res: Response, next: NextFunction) => {
  // Additional parameter validation for specific coin prices can be added here
  next();
};