import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin list parameters
 * @returns Array of middleware functions for validation
 */
export function validateCoinListParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { include_platform } = req.query;
      
      // Always call next() 
      if (include_platform) {
        // Optional additional validation if needed
        req.query.validatedPlatform = 'true';
      }
      
      next();
    }
  ];
}

/**
 * Validate coin price parameters
 * @returns Array of middleware functions for validation
 */
export function validateCoinPriceParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids } = req.query;

      // Validate ids presence and format
      if (!ids || typeof ids !== 'string' || ids.trim().length === 0) {
        return res.status(400).json({
          error: 'Invalid Coin IDs',
          message: 'Coin IDs are required'
        });
      }

      next();
    },
    (req: Request, res: Response, next: NextFunction) => {
      const { ids } = req.query;

      // Validate coin ID format using regex
      const coinIdRegex = /^[a-z0-9,-]+$/i;
      if (!coinIdRegex.test(String(ids))) {
        return res.status(400).json({
          error: 'Invalid Coin ID Format',
          message: 'Coin IDs can only contain letters, numbers, commas, and hyphens'
        });
      }

      next();
    },
    (req: Request, res: Response, next: NextFunction) => {
      const { vs_currencies } = req.query;

      // Validate vs_currencies
      if (!vs_currencies || typeof vs_currencies !== 'string' || vs_currencies.trim().length === 0) {
        return res.status(400).json({
          error: 'Invalid Currency',
          message: 'VS currencies are required'
        });
      }

      next();
    }
  ];
}

/**
 * Validate coin details parameters
 * @returns Array of middleware functions for validation
 */
export function validateCoinDetailsParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const coinId = req.params.id; // Note the change from coinId to id per test case

      // Basic presence check
      if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
        return res.status(400).json({
          error: 'Invalid Coin ID',
          message: 'Coin ID is required and must be a non-empty string'
        });
      }

      next();
    },
    (req: Request, res: Response, next: NextFunction) => {
      const coinId = req.params.id;

      // Optional: Add regex validation for coin ID format
      const coinIdRegex = /^[a-z0-9-]+$/i;
      if (!coinIdRegex.test(coinId)) {
        return res.status(400).json({
          error: 'Invalid Coin ID Format',
          message: 'Coin ID can only contain letters, numbers, and hyphens'
        });
      }

      next();
    }
  ];
}