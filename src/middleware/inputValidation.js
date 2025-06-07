/**
 * Validate coin ID parameters
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
export function validateCoinId(req, res, next) {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Coin ID is required and must be a non-empty string'
    });
  }

  // Basic coin ID validation: alphanumeric with optional dash or underscore
  const coinIdRegex = /^[a-z0-9-_]+$/i;
  if (!coinIdRegex.test(coinId)) {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Coin ID contains invalid characters'
    });
  }

  next();
}

/**
 * Validate coin price parameters
 * @returns {Array} Array of middleware functions
 */
export function validateCoinPriceParams() {
  return [
    (req, res, next) => {
      const { vs_currencies, ids } = req.query;

      if (!vs_currencies) {
        return res.status(400).json({
          error: 'Invalid Input',
          message: 'vs_currencies parameter is required'
        });
      }

      if (ids && !/^[a-z0-9-_,]+$/i.test(ids)) {
        return res.status(400).json({
          error: 'Invalid Input',
          message: 'ids parameter contains invalid characters'
        });
      }

      next();
    }
  ];
}

/**
 * Validate coin list parameters
 * @returns {Array} Array of middleware functions
 */
export function validateCoinListParams() {
  return [
    (req, res, next) => {
      const { include_platform } = req.query;

      if (include_platform && typeof include_platform !== 'string') {
        return res.status(400).json({
          error: 'Invalid Input',
          message: 'include_platform must be a string'
        });
      }

      next();
    }
  ];
}

/**
 * Validate coin details parameters
 * @returns {Array} Array of middleware functions
 */
export function validateCoinDetailsParams() {
  return [validateCoinId];
}

export default {
  validateCoinId,
  validateCoinPriceParams,
  validateCoinListParams,
  validateCoinDetailsParams
};