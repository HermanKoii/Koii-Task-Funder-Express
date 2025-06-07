const { ValidationError } = require('../types/error');

// Validate coin price parameters
function validateCoinPriceParams() {
  return [
    (req, res, next) => {
      const { ids, vs_currencies } = req.query;

      // Validate ids parameter
      if (!ids || typeof ids !== 'string' || !/^[a-z0-9-]+$/.test(ids)) {
        return next(new ValidationError('Invalid coin ID(s)'));
      }

      // Validate vs_currencies parameter
      if (!vs_currencies || typeof vs_currencies !== 'string' || !/^[a-z0-9-]+$/.test(vs_currencies)) {
        return next(new ValidationError('Invalid target currency'));
      }

      next();
    }
  ];
}

// Validate coin list parameters
function validateCoinListParams() {
  return [
    (req, res, next) => {
      const { include_platform } = req.query;

      // Optional validation for include_platform
      if (include_platform && !['true', 'false'].includes(include_platform)) {
        return next(new ValidationError('Invalid include_platform value'));
      }

      next();
    }
  ];
}

// Validate coin details parameters
function validateCoinDetailsParams() {
  return [
    (req, res, next) => {
      const { id } = req.params;

      // Validate coin ID
      if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/.test(id)) {
        return next(new ValidationError('Invalid coin ID'));
      }

      next();
    }
  ];
}

module.exports = {
  validateCoinPriceParams,
  validateCoinListParams,
  validateCoinDetailsParams
};