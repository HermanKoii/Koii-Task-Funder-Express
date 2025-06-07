import { Request, Response, NextFunction } from 'express';

export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  const { order, per_page, page } = req.query;

  // Validate order
  if (order && !['market_cap_desc', 'market_cap_asc'].includes(order as string)) {
    return res.status(400).json({ error: 'Invalid order parameter' });
  }

  // Validate per_page
  const perPage = Number(per_page);
  if (per_page && (isNaN(perPage) || perPage < 1 || perPage > 250)) {
    return res.status(400).json({ error: 'Per page must be between 1 and 250' });
  }

  // Validate page
  const pageNum = Number(page);
  if (page && (isNaN(pageNum) || pageNum < 1)) {
    return res.status(400).json({ error: 'Page must be a positive number' });
  }

  next();
};

export const validateCoinPriceParams = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Coin ID is required' });
  }

  next();
};

export const validateCoin = (coin: any) => {
  const requiredFields = ['id', 'symbol', 'name', 'current_price', 'market_cap', 'total_volume'];
  return requiredFields.every(field => coin.hasOwnProperty(field));
};