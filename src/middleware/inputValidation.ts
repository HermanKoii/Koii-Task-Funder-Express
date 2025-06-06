import { Request, Response, NextFunction } from 'express';

/**
 * Generic input validation middleware generator
 * @param validators Array of validation functions
 * @returns Array of middleware functions
 */
function createValidationMiddleware(validators: ((req: Request, res: Response) => boolean)[]) {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      for (const validate of validators) {
        if (!validate(req, res)) {
          return; // Stop if any validation fails
        }
      }
      next(); // Call next if all validations pass
    }
  ];
}

/**
 * Validate coin details parameters
 * @returns {Function[]} Array of middleware functions for validation
 */
export function validateCoinDetailsParams(): ((req: Request, res: Response, next: NextFunction) => void)[] {
  const validators = [
    (req: Request, res: Response) => {
      const params = req.params || {};
      const { id } = params;
      
      if (!id) {
        res.status(400).json({ error: 'Coin ID is required' });
        return false;
      }

      const coinIdRegex = /^[a-z0-9-]+$/i;
      if (!coinIdRegex.test(id)) {
        res.status(400).json({ error: 'Invalid coin ID format' });
        return false;
      }

      return true;
    }
  ];

  return createValidationMiddleware(validators);
}

/**
 * Validate coin price parameters
 * @returns {Function[]} Array of middleware functions for validation
 */
export function validateCoinPriceParams(): ((req: Request, res: Response, next: NextFunction) => void)[] {
  const validators = [
    (req: Request, res: Response) => {
      const query = req.query || {};
      const { ids, vs_currencies } = query;
      
      if (!ids || typeof ids !== 'string') {
        res.status(400).json({ error: 'Invalid or missing coin ID' });
        return false;
      }

      if (!vs_currencies || typeof vs_currencies !== 'string') {
        res.status(400).json({ error: 'Invalid or missing currency' });
        return false;
      }

      return true;
    }
  ];

  return createValidationMiddleware(validators);
}

/**
 * Validate coin list parameters
 * @returns {Function[]} Array of middleware functions for validation
 */
export function validateCoinListParams(): ((req: Request, res: Response, next: NextFunction) => void)[] {
  const validators = [
    (req: Request, res: Response) => {
      const query = req.query || {};
      const { page = 1, limit = 10 } = query;

      const parsedPage = Number(page);
      const parsedLimit = Number(limit);

      if (isNaN(parsedPage) || parsedPage < 1) {
        res.status(400).json({ error: 'Invalid page number' });
        return false;
      }

      if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
        res.status(400).json({ error: 'Invalid limit. Must be between 1 and 100' });
        return false;
      }

      return true;
    }
  ];

  return createValidationMiddleware(validators);
}

/**
 * Validate individual coin data
 * @returns {Function[]} Array of middleware functions for validation
 */
export function validateCoinData(): ((req: Request, res: Response, next: NextFunction) => void)[] {
  const validators = [
    (req: Request, res: Response) => {
      const body = req.body || {};
      const { coin } = body;

      if (!coin) {
        res.status(400).json({ error: 'Coin data is required' });
        return false;
      }

      if (!coin.id || !coin.name || !coin.symbol) {
        res.status(400).json({ error: 'Coin must have id, name, and symbol' });
        return false;
      }

      return true;
    }
  ];

  return createValidationMiddleware(validators);
}