// Input validation middleware for cryptocurrency routes
const validateCoinPriceParams = () => {
  return [
    (req, res, next) => {
      const { ids, vs_currencies } = req.query;

      // Basic validation for cryptocurrency IDs
      if (!ids || !/^[a-z0-9,-]+$/i.test(ids)) {
        return res.status(400).json({ error: 'Invalid coin IDs' });
      }

      // Basic validation for versus currencies
      if (!vs_currencies || !/^[a-z0-9,-]+$/i.test(vs_currencies)) {
        return res.status(400).json({ error: 'Invalid versus currencies' });
      }

      return next();
    }
  ];
};

const validateCoinListParams = () => {
  return [
    (req, res, next) => {
      const { include_platform } = req.query;

      // Optional validation for include_platform
      if (include_platform && !['true', 'false'].includes(include_platform)) {
        return res.status(400).json({ error: 'Invalid include_platform value' });
      }

      return next();
    }
  ];
};

const validateCoinDetailsParams = () => {
  return [
    (req, res, next) => {
      const { id } = req.params;

      // Basic validation for coin ID
      if (!id || !/^[a-z0-9-]+$/i.test(id)) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }

      return next();
    }
  ];
};

module.exports = {
  validateCoinPriceParams,
  validateCoinListParams,
  validateCoinDetailsParams
};