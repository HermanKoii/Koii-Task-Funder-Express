import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin price parameters
 */
export function validateCoinPriceParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query;
      
      // Validate ids
      if (!ids || typeof ids !== 'string' || !/^[a-z0-9,-]+$/i.test(ids)) {
        return res.status(400).json({ error: 'Invalid coin IDs' });
      }

      // Validate vs_currencies
      if (!vs_currencies || typeof vs_currencies !== 'string' || !/^[a-z,-]+$/i.test(vs_currencies)) {
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
      const { page, limit, include_platform } = req.query;

      // Optional validation for page and limit
      if (page && (isNaN(Number(page)) || Number(page) < 1)) {
        return res.status(400).json({ error: 'Invalid page number' });
      }

      if (limit && (isNaN(Number(limit)) || Number(limit) < 1)) {
        return res.status(400).json({ error: 'Invalid limit' });
      }

      // Optional platform validation
      if (include_platform && typeof include_platform !== 'string') {
        return res.status(400).json({ error: 'Invalid include_platform parameter' });
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

      if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/i.test(id)) {
        return res.status(400).json({ error: 'Invalid coin identifier' });
      }

      next();
    }
  ];
}