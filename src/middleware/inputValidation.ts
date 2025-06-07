import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin price query parameters
 * @returns Array of middleware functions for coin price validation
 */
export function validateCoinPriceParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query;

      try {
        // Check if ids is provided and valid
        if (!ids || typeof ids !== 'string' || !/^[a-z0-9,-]+$/i.test(ids)) {
          return res.status(400).json({
            error: 'Invalid Coin IDs',
            message: 'Coin IDs must be a comma-separated list of valid cryptocurrency identifiers'
          });
        }

        // Check if vs_currencies is provided and valid
        if (!vs_currencies || typeof vs_currencies !== 'string' || !/^[a-z0-9,-]+$/i.test(vs_currencies)) {
          return res.status(400).json({
            error: 'Invalid Currencies',
            message: 'Currency list must be a comma-separated list of valid currency codes'
          });
        }

        next();
      } catch (error) {
        next(error);
      }
    }
  ];
}

/**
 * Validate coin list query parameters
 * @returns Array of middleware functions for coin list validation
 */
export function validateCoinListParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { include_platform } = req.query;

      try {
        // Optional validation for include_platform
        if (include_platform && !['true', 'false'].includes(String(include_platform))) {
          return res.status(400).json({
            error: 'Invalid Parameter',
            message: 'include_platform must be either "true" or "false"'
          });
        }

        next();
      } catch (error) {
        next(error);
      }
    }
  ];
}

/**
 * Validate coin details parameters
 * @returns Array of middleware functions for coin details validation
 */
export function validateCoinDetailsParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      try {
        // Check if id is provided and valid
        if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/i.test(id)) {
          return res.status(400).json({
            error: 'Invalid Coin ID',
            message: 'Coin ID must be a valid cryptocurrency identifier'
          });
        }

        next();
      } catch (error) {
        next(error);
      }
    }
  ];
}