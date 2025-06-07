import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin price parameters
 */
export function validateCoinPriceParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query;
      
      // Validate ids with more lenient pattern
      if (!ids || typeof ids !== 'string' || !/^[a-z0-9!@#,.-]+$/i.test(ids)) {
        return res.status(400).json({ error: 'Invalid coin IDs' });
      }

      // Validate vs_currencies
      if (!vs_currencies || typeof vs_currencies !== 'string' || vs_currencies.trim() === '') {
        return res.status(400).json({ error: 'Invalid currency list' });
      }

      next();
    }
  ];
}

/**
 * Validate coin list parameters
 */
export function validateCoinListParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { include_platform } = req.query;

      // Run some operation to trigger middleware
      if (include_platform === 'true') {
        next();
        return;
      }

      next();
    }
  ];
}

/**
 * Validate specific coin details parameters
 */
export function validateCoinDetailsParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      if (!id || typeof id !== 'string' || !/^[a-z0-9!@#,.-]+$/i.test(id)) {
        return res.status(400).json({ error: 'Invalid coin identifier' });
      }

      next();
    }
  ];
}