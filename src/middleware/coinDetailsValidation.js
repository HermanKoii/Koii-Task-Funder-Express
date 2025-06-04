const Joi = require('joi');

/**
 * Middleware to validate coin details request parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateCoinDetails = (req, res, next) => {
  // Validation schema for coin ID
  const coinIdSchema = Joi.string()
    .trim()  // Remove leading/trailing whitespace
    .min(1)  // At least 1 character after trimming
    .max(50) // Reasonable max length
    .pattern(/^[a-z0-9-]+$/)  // Only lowercase alphanumeric and hyphens
    .required();

  // Validate coin ID
  const { error } = coinIdSchema.validate(req.params.coinId);

  // If validation fails, return 400 Bad Request
  if (error) {
    return res.status(400).json({
      error: 'Invalid coin ID',
      details: error.details[0].message
    });
  }

  // If validation passes, proceed to next middleware
  next();
};

module.exports = validateCoinDetails;