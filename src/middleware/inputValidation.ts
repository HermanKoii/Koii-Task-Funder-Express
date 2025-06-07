import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin list query parameters
 */
export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  const { order, per_page, page } = req.query || {};

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
 * Validate coin price query parameters
 */
export const validateCoinPriceParams = () => {
  return {
    validate: (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currency, days } = req.query || {};

      // Validate ids parameter
      if (!ids || typeof ids !== 'string' || !/^[a-z0-9,]+$/i.test(ids)) {
        return res.status(400).json({ error: 'Invalid coin ID(s)' });
      }

      // Validate vs_currency parameter
      if (!vs_currency || typeof vs_currency !== 'string') {
        return res.status(400).json({ error: 'Invalid vs_currency' });
      }

      // Validate days parameter
      if (days) {
        const daysNum = Number(days);
        if (isNaN(daysNum) || daysNum < 1) {
          return res.status(400).json({ error: 'days must be a positive number' });
        }
      }

      next();
    }
  };
};

/**
 * Validate specific coin details parameters
 */
export const validateCoinDetailsParams = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params || {};

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }

  next();
};