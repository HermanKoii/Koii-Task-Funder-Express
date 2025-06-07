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
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
export function validateCoinPriceParams(req, res, next) {
  // Default parameters in case req is undefined
  const query = req?.query || {};
  const { vs_currency, ids } = query;

  if (!vs_currency) {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'vs_currency parameter is required'
    });
  }

  if (ids && typeof ids !== 'string') {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'ids parameter must be a comma-separated string'
    });
  }

  next();
}

/**
 * Validate coin list parameters
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
export function validateCoinListParams(req, res, next) {
  // Default parameters in case req is undefined
  const query = req?.query || {};
  const { include_platform } = query;

  if (include_platform && typeof include_platform !== 'string') {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'include_platform must be a string'
    });
  }

  next();
}

/**
 * Validate coin details parameters
 * @returns {Object} An object with parameter validation functions
 */
export function validateCoinDetailsParams() {
  return {
    validateCoinId
  };
}

export default {
  validateCoinId,
  validateCoinPriceParams,
  validateCoinListParams,
  validateCoinDetailsParams
};