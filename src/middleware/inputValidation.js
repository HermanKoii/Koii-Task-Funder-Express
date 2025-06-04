import { body, query, param, validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

/**
 * Validation rules for coin price endpoint
 */
export const validateCoinPriceParams = () => [
  query('ids')
    .isString().withMessage('ids must be a string')
    .notEmpty().withMessage('ids cannot be empty')
    .matches(/^[a-zA-Z0-9,-]+$/).withMessage('Invalid ids format'),
  
  query('vs_currencies')
    .isString().withMessage('vs_currencies must be a string')
    .notEmpty().withMessage('vs_currencies cannot be empty')
    .matches(/^[a-zA-Z0-9,-]+$/).withMessage('Invalid vs_currencies format'),

  handleValidationErrors
];

/**
 * Validation rules for coin list endpoint
 */
export const validateCoinListParams = () => [
  query('include_platform')
    .optional()
    .isBoolean().withMessage('include_platform must be a boolean'),
  
  handleValidationErrors
];

/**
 * Validation rules for coin details endpoint
 */
export const validateCoinDetailsParams = () => [
  param('id')
    .isString().withMessage('Coin ID must be a string')
    .notEmpty().withMessage('Coin ID cannot be empty')
    .matches(/^[a-zA-Z0-9-]+$/).withMessage('Invalid coin ID format'),

  handleValidationErrors
];