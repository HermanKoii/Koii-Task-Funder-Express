// Input validation middleware for cryptocurrency routes
const validateCoinPriceParams = () => {
  return [
    (req, res, next) => {
      const { ids } = req.query;

      // First validation for cryptocurrency IDs
      if (!ids || !/^[a-z0-9,-]+$/i.test(ids)) {
        return res.status(400).json({ error: 'Invalid coin IDs' });
      }

      // Call next to move to the next middleware
      next();
    },
    (req, res, next) => {
      const { vs_currencies } = req.query;

      // Second validation for versus currencies
      if (!vs_currencies || !/^[a-z0-9,-]+$/i.test(vs_currencies)) {
        return res.status(400).json({ error: 'Invalid versus currencies' });
      }

      // Call next to complete validation
      next();
    }
  ];
};

const validateCoinListParams = () => {
  return [
    (req, res, next) => {
      const { include_platform } = req.query;

      // Validation for include_platform
      if (include_platform && !['true', 'false'].includes(include_platform)) {
        return res.status(400).json({ error: 'Invalid include_platform value' });
      }

      // Complete validation
      next();
    }
  ];
};

const validateCoinDetailsParams = () => {
  return [
    (req, res, next) => {
      const { id } = req.params;

      // Validation for coin ID
      if (!id || !/^[a-z0-9-]+$/i.test(id)) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }

      // Complete validation
      next();
    }
  ];
};

module.exports = {
  validateCoinPriceParams,
  validateCoinListParams,
  validateCoinDetailsParams
};