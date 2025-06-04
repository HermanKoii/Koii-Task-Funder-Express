const { body, param, query, validationResult } = require('express-validator');

/**
 * Middleware to handle validation errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object|void} Error response or continues to next middleware
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

/**
 * Validator for coin list endpoint
 * @returns {Array} Validation middleware chain
 */
const validateCoinList = () => [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('per_page')
    .optional()
    .isInt({ min: 1, max: 250 })
    .withMessage('Per page must be between 1 and 250'),
  query('order')
    .optional()
    .isIn(['market_cap_desc', 'market_cap_asc', 'volume_desc', 'volume_asc'])
    .withMessage('Invalid order parameter'),
  handleValidationErrors
];

/**
 * Validator for coin prices endpoint
 * @returns {Array} Validation middleware chain
 */
const validateCoinPrices = () => [
  query('ids')
    .notEmpty()
    .withMessage('Coin IDs are required')
    .isString()
    .withMessage('Coin IDs must be a comma-separated string'),
  query('vs_currencies')
    .notEmpty()
    .withMessage('Versus currencies are required')
    .isString()
    .withMessage('Versus currencies must be a comma-separated string'),
  handleValidationErrors
];

/**
 * Validator for coin details endpoint
 * @returns {Array} Validation middleware chain
 */
const validateCoinDetails = () => [
  param('id')
    .notEmpty()
    .withMessage('Coin ID is required')
    .isString()
    .withMessage('Coin ID must be a string')
    .trim()
    .escape(),
  handleValidationErrors
];

module.exports = {
  validateCoinList,
  validateCoinPrices,
  validateCoinDetails
};