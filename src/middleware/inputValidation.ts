import { Request, Response, NextFunction } from 'express';

type ReqType = Request & { 
  query?: Record<string, string | string[] | undefined>; 
  params?: Record<string, string | undefined>;
};

/**
 * Validate coin list query parameters
 */
export const validateCoinListParams = (req: ReqType, res: Response, next: NextFunction) => {
  // Ensure query is an object
  const query = typeof req.query === 'object' && req.query !== null 
    ? req.query 
    : {};

  // Validate order parameter
  if (query.order && typeof query.order !== 'string') {
    return res.status(400).json({ error: 'Invalid order parameter' });
  }

  // Validate per_page parameter
  if (query.per_page) {
    const perPageNum = Number(query.per_page);
    if (isNaN(perPageNum) || perPageNum < 1 || perPageNum > 250) {
      return res.status(400).json({ error: 'per_page must be a number between 1 and 250' });
    }
  }

  // Validate page parameter
  if (query.page) {
    const pageNum = Number(query.page);
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
    validate: (req: ReqType, res: Response, next: NextFunction) => {
      // Ensure query is an object
      const query = typeof req.query === 'object' && req.query !== null 
        ? req.query 
        : {};

      // Validate ids parameter
      if (!query.ids || typeof query.ids !== 'string' || !/^[a-z0-9,]+$/i.test(query.ids)) {
        res.status(400);
        return res.json({ error: 'Invalid coin ID(s)' });
      }

      // Validate vs_currency parameter
      if (!query.vs_currency || typeof query.vs_currency !== 'string') {
        res.status(400);
        return res.json({ error: 'Invalid vs_currency' });
      }

      // Validate days parameter
      if (query.days) {
        const daysNum = Number(query.days);
        if (isNaN(daysNum) || daysNum < 1) {
          res.status(400);
          return res.json({ error: 'days must be a positive number' });
        }
      }

      next();
    }
  };
};

/**
 * Validate specific coin details parameters
 */
export const validateCoinDetailsParams = (req: ReqType, res: Response, next: NextFunction) => {
  // Ensure params is an object
  const params = typeof req.params === 'object' && req.params !== null 
    ? req.params 
    : {};

  if (!params.id || typeof params.id !== 'string') {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }

  next();
};