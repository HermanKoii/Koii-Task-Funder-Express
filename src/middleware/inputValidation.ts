import { Request, Response, NextFunction } from 'express';

export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  const { order, per_page, page } = req.query;

  // Validate order parameter
  if (order && typeof order !== 'string') {
    return res.status(400).json({ error: 'Invalid order parameter' });
  }

  // Validate per_page parameter
  if (per_page) {
    const perPageNum = Number(per_page);
    if (isNaN(perPageNum) || perPageNum < 1 || perPageNum > 250) {
      return res.status(400).json({ error: 'Per page must be a number between 1 and 250' });
    }
  }

  // Validate page parameter
  if (page) {
    const pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({ error: 'Page must be a positive number' });
    }
  }

  next();
};

export const validateCoinPriceParams = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }

  next();
};

export const validateCoin = (req: Request, res: Response, next: NextFunction) => {
  const { id, symbol, name } = req.body;

  if (!id || !symbol || !name) {
    return res.status(400).json({ error: 'Coin must have id, symbol, and name' });
  }

  next();
};