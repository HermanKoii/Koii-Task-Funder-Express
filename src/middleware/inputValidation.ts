import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin details parameters
 * @returns {Function[]} Array of middleware functions for validation
 */
export function validateCoinDetailsParams(): ((req: Request, res: Response, next: NextFunction) => void)[] {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const params = req.params || {};
      const { id } = params;
      
      if (!id) {
        return res.status(400).json({ error: 'Coin ID is required' });
      }

      const coinIdRegex = /^[a-z0-9-]+$/i;
      if (!coinIdRegex.test(id)) {
        return res.status(400).json({ error: 'Invalid coin ID format' });
      }

      next();
    },
    // Additional validation steps can be added here
    (req: Request, res: Response, next: NextFunction) => {
      // Example of an additional validation step
      next();
    }
  ];
}

/**
 * Validate coin price parameters
 * @returns {Function[]} Array of middleware functions for validation
 */
export function validateCoinPriceParams(): ((req: Request, res: Response, next: NextFunction) => void)[] {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const query = req.query || {};
      const { ids, vs_currencies } = query;
      
      if (!ids || typeof ids !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing coin ID' });
      }

      if (!vs_currencies || typeof vs_currencies !== 'string') {
        return res.status(400).json({ error: 'Invalid or missing currency' });
      }

      next();
    },
    // Additional validation steps can be added here
    (req: Request, res: Response, next: NextFunction) => {
      // Example of an additional validation step
      next();
    }
  ];
}

/**
 * Validate coin list parameters
 * @returns {Function[]} Array of middleware functions for validation
 */
export function validateCoinListParams(): ((req: Request, res: Response, next: NextFunction) => void)[] {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const query = req.query || {};
      const { page = 1, limit = 10 } = query;

      const parsedPage = Number(page);
      const parsedLimit = Number(limit);

      if (isNaN(parsedPage) || parsedPage < 1) {
        return res.status(400).json({ error: 'Invalid page number' });
      }

      if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
        return res.status(400).json({ error: 'Invalid limit. Must be between 1 and 100' });
      }

      next();
    },
    // Additional validation steps can be added here
    (req: Request, res: Response, next: NextFunction) => {
      // Example of an additional validation step
      next();
    }
  ];
}

/**
 * Validate individual coin data
 * @returns {Function[]} Array of middleware functions for validation
 */
export function validateCoinData(): ((req: Request, res: Response, next: NextFunction) => void)[] {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const body = req.body || {};
      const { coin } = body;

      if (!coin) {
        return res.status(400).json({ error: 'Coin data is required' });
      }

      if (!coin.id || !coin.name || !coin.symbol) {
        return res.status(400).json({ error: 'Coin must have id, name, and symbol' });
      }

      next();
    },
    // Additional validation steps can be added here
    (req: Request, res: Response, next: NextFunction) => {
      // Example of an additional validation step
      next();
    }
  ];
}