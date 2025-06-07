import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Validation schemas
const coinIdSchema = Joi.string()
  .trim()
  .lowercase()
  .pattern(/^[a-z0-9-]+$/)
  .min(1)
  .max(50);

const currencySchema = Joi.string()
  .trim()
  .lowercase()
  .pattern(/^[a-z0-9-]+$/);

/**
 * Middleware to validate coin price query parameters
 * @returns Array of validation middleware functions
 */
export const validateCoinPriceParams = () => [
  (req: Request, res: Response, next: NextFunction) => {
    const { ids, vs_currencies } = req.query;

    const { error: idsError } = coinIdSchema.validate(ids);
    const { error: currenciesError } = currencySchema.validate(vs_currencies);

    if (idsError || currenciesError) {
      return res.status(400).json({
        error: 'Invalid query parameters',
        details: idsError?.message || currenciesError?.message
      });
    }

    next();
  }
];

/**
 * Middleware to validate coin list query parameters
 * @returns Array of validation middleware functions
 */
export const validateCoinListParams = () => [
  (req: Request, res: Response, next: NextFunction) => {
    const { include_platform } = req.query;

    // Optional boolean validation
    if (include_platform && !['true', 'false'].includes(String(include_platform).toLowerCase())) {
      return res.status(400).json({
        error: 'Invalid include_platform parameter',
        details: 'Must be "true" or "false"'
      });
    }

    next(); // Always call next
  }
];

/**
 * Middleware to validate coin details parameters
 * @returns Array of validation middleware functions
 */
export const validateCoinDetailsParams = () => [
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { error } = coinIdSchema.validate(id);

    if (error) {
      return res.status(400).json({
        error: 'Invalid coin ID',
        details: error.message
      });
    }

    next(); // Always call next
  }
];