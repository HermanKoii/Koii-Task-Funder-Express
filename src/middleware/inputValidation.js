// Input validation middleware for cryptocurrency routes
const validateCoinPriceParams = () => {
  return [
    (req, res, recursiveNext) => {
      const { ids } = req.query;

      // Basic validation for cryptocurrency IDs
      if (!ids || !/^[a-z0-9,-]+$/i.test(ids)) {
        return res.status(400).json({ error: 'Invalid coin IDs' });
      }

      // Call the next middleware in the chain
      return recursiveNext();
    },
    (req, res, recursiveNext) => {
      const { vs_currencies } = req.query;

      // Basic validation for versus currencies
      if (!vs_currencies || !/^[a-z0-9,-]+$/i.test(vs_currencies)) {
        return res.status(400).json({ error: 'Invalid versus currencies' });
      }

      // Call the next middleware or final handler
      return recursiveNext();
    }
  ];
};

const validateCoinListParams = () => {
  return [
    (req, res, recursiveNext) => {
      const { include_platform } = req.query;

      // Optional validation for include_platform
      if (include_platform && !['true', 'false'].includes(include_platform)) {
        return res.status(400).json({ error: 'Invalid include_platform value' });
      }

      // Call the next middleware or final handler
      return recursiveNext();
    }
  ];
};

const validateCoinDetailsParams = () => {
  return [
    (req, res, recursiveNext) => {
      const { id } = req.params;

      // Basic validation for coin ID
      if (!id || !/^[a-z0-9-]+$/i.test(id)) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }

      // Call the next middleware or final handler
      return recursiveNext();
    }
  ];
};

module.exports = {
  validateCoinPriceParams,
  validateCoinListParams,
  validateCoinDetailsParams
};