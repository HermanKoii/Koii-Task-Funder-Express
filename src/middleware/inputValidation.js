import validator from 'validator';

/**
 * Validate and sanitize input parameters for CoinGecko mock API routes
 * @param {Object} validationRules - Rules for input validation
 * @returns {Function} Express middleware function
 */
export const validateInput = (validationRules = {}) => {
  return (req, res, next) => {
    const errors = [];

    // Validate query parameters
    Object.keys(validationRules.query || {}).forEach(param => {
      const value = req.query[param];
      const rules = validationRules.query[param];

      if (rules.required && (value === undefined || value === null)) {
        errors.push(`Query parameter '${param}' is required`);
        return;
      }

      if (value !== undefined) {
        // Type validation
        if (rules.type && typeof value !== rules.type) {
          errors.push(`Query parameter '${param}' must be of type ${rules.type}`);
        }

        // Custom validation rules
        if (rules.validate) {
          const validationResult = rules.validate(value);
          if (!validationResult) {
            errors.push(`Invalid value for query parameter '${param}'`);
          }
        }

        // Sanitization
        if (rules.sanitize) {
          req.query[param] = rules.sanitize(value);
        }
      }
    });

    // Validate body parameters
    Object.keys(validationRules.body || {}).forEach(param => {
      const value = req.body[param];
      const rules = validationRules.body[param];

      if (rules.required && (value === undefined || value === null)) {
        errors.push(`Body parameter '${param}' is required`);
        return;
      }

      if (value !== undefined) {
        // Type validation
        if (rules.type && typeof value !== rules.type) {
          errors.push(`Body parameter '${param}' must be of type ${rules.type}`);
        }

        // Custom validation rules
        if (rules.validate) {
          const validationResult = rules.validate(value);
          if (!validationResult) {
            errors.push(`Invalid value for body parameter '${param}'`);
          }
        }

        // Sanitization
        if (rules.sanitize) {
          req.body[param] = rules.sanitize(value);
        }
      }
    });

    // If there are validation errors, return a 400 Bad Request
    if (errors.length > 0) {
      return res.status(400).json({
        error: 'Validation Failed',
        details: errors
      });
    }

    next();
  };
};

// Predefined validation helpers
export const validationHelpers = {
  /**
   * Validate cryptocurrency ID
   * @param {string} id - Cryptocurrency ID to validate
   * @returns {boolean} Validation result
   */
  isValidCoinId: (id) => {
    // Validate coin ID: alphanumeric with optional hyphens/underscores
    return /^[a-z0-9-_]+$/i.test(id);
  },

  /**
   * Validate currency string
   * @param {string} currency - Currency to validate
   * @returns {boolean} Validation result
   */
  isValidCurrency: (currency) => {
    // Validate currency: uppercase 3-letter currency codes
    return /^[A-Z]{3}$/.test(currency);
  },

  /**
   * Sanitize input string
   * @param {string} input - Input to sanitize
   * @returns {string} Sanitized input
   */
  sanitizeString: (input) => {
    return validator.escape(input.trim());
  },

  /**
   * Validate boolean value
   * @param {*} value - Value to validate
   * @returns {boolean} Validation result
   */
  isBoolean: (value) => {
    return typeof value === 'boolean' || 
           value === 'true' || 
           value === 'false';
  }
};