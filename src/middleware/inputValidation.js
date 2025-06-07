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

  next();
}

/**
 * Validate coin price parameters
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 * @param {express.NextFunction} next - Express next middleware function
 */
export function validateCoinPriceParams(req, res, next) {
  const { vs_currency, ids } = req.query;

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
  const { include_platform } = req.query;

  if (include_platform && typeof include_platform !== 'string') {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'include_platform must be a string'
    });
  }

  next();
}

export default {
  validateCoinId,
  validateCoinPriceParams,
  validateCoinListParams
};