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
        next();
        return;
      }

      // Validate vs_currencies
      if (!vs_currencies || typeof vs_currencies !== 'string' || !/^[a-z,-]+$/i.test(vs_currencies)) {
        next();
        return;
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

      // Optional platform validation
      if (include_platform !== 'true') {
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

      if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/i.test(id)) {
        next();
        return;
      }

      next();
    }
  ];
}