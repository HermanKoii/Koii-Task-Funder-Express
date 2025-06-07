import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin list query parameters
 */
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
      return res.status(400).json({ error: 'per_page must be a number between 1 and 250' });
    }
  }

  // Validate page parameter
  if (page) {
    const pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({ error: 'page must be a positive number' });
    }
  }

  next();
};

/**
 * Validate specific coin details parameters
 */
export const validateCoinDetailsParams = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }

  next();
};