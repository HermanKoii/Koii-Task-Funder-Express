const Joi = require('joi');

/**
 * Middleware to validate coin details request parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object|void} Validation error response or continue to next middleware
 */
const validateCoinDetails = (req, res, next) => {
  // Define validation schema
  const schema = Joi.object({
    coinId: Joi.string()
      .trim()
      .lowercase()
      .min(1)
      .max(50)
      .pattern(/^[a-z0-9-]+$/)
      .required()
      .messages({
        'string.empty': 'Coin ID cannot be empty',
        'string.min': 'Coin ID must be at least 1 character long',
        'string.max': 'Coin ID cannot exceed 50 characters',
        'string.pattern.base': 'Coin ID can only contain lowercase letters, numbers, and hyphens'
      })
  });

  // Validate request parameters
  const { error } = schema.validate({ coinId: req.params.coinId });

  // If validation fails, return error response
  if (error) {
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message,
      code: 'INVALID_COIN_ID'
    });
  }

  // If validation passes, proceed to next middleware
  next();
};

module.exports = { validateCoinDetails };