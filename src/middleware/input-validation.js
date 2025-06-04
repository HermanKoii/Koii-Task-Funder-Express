import Joi from 'joi';

/**
 * Middleware for validating request inputs
 * @param {Object} schema - Joi validation schema
 * @returns {Function} Express middleware function
 */
export const validateInput = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        message: detail.message,
        path: detail.path
      }));

      return res.status(400).json({
        status: 'error',
        message: 'Invalid input parameters',
        errors: errorDetails
      });
    }

    next();
  };
};

/**
 * Validation schemas for different routes
 */
export const validationSchemas = {
  /**
   * Schema for coin price endpoint
   */
  coinPriceSchema: Joi.object({
    ids: Joi.string().required().description('Comma-separated list of coin ids'),
    vs_currencies: Joi.string().required().description('Target currency for price conversion'),
  }),

  /**
   * Schema for coin list endpoint
   */
  coinListSchema: Joi.object({
    include_platform: Joi.boolean().optional().description('Include platform data'),
  }),

  /**
   * Schema for coin details endpoint
   */
  coinDetailsSchema: Joi.object({
    id: Joi.string().required().description('Coin identifier'),
    localization: Joi.boolean().optional().default(true).description('Include localized data'),
    tickers: Joi.boolean().optional().default(false).description('Include market ticker data'),
  }),
};