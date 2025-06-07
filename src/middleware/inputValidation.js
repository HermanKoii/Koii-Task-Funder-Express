/**
 * Validate coin price parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
export function validateCoinPriceParams(req, res, next) {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string') {
    return res.status(400).json({
      error: 'Invalid Parameters',
      message: 'Coin ID is required and must be a string'
    });
  }

  next();
}

/**
 * Validate coin list parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
export function validateCoinListParams(req, res, next) {
  const { limit, offset } = req.query;

  if (limit && (isNaN(limit) || parseInt(limit) <= 0)) {
    return res.status(400).json({
      error: 'Invalid Parameters',
      message: 'Limit must be a positive number'
    });
  }

  if (offset && (isNaN(offset) || parseInt(offset) < 0)) {
    return res.status(400).json({
      error: 'Invalid Parameters',
      message: 'Offset must be a non-negative number'
    });
  }

  next();
}

/**
 * Validate coin object
 * @param {Object} coin - Coin object to validate
 * @returns {boolean} - Whether the coin is valid
 */
export function validateCoin(coin) {
  if (!coin) return false;

  const requiredFields = ['id', 'symbol', 'name', 'price'];
  return requiredFields.every(field => coin.hasOwnProperty(field) && 
         (field !== 'price' || typeof coin[field] === 'number'));
}