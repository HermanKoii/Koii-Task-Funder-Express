/**
 * Validate coin ID
 * @param {string} coinId - Coin identifier to validate
 * @returns {boolean} - Whether the coin ID is valid
 */
function isValidCoinId(coinId) {
  return coinId && 
         typeof coinId === 'string' && 
         /^[a-z0-9-]+$/.test(coinId.toLowerCase());
}

/**
 * Validate coin price parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
export function validateCoinPriceParams(req, res, next) {
  if (!req || !req.params) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request parameters are missing'
    });
  }

  const { coinId } = req.params;

  if (!isValidCoinId(coinId)) {
    return res.status(400).json({
      error: 'Invalid Parameters',
      message: 'Coin ID is required and must contain only lowercase letters, numbers, and hyphens'
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
  if (!req || !req.query) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request query parameters are missing'
    });
  }

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
 * Validate coin details parameters
 * @returns {Object} Validation middleware functions
 */
export function validateCoinDetailsParams() {
  return {
    /**
     * Validate coin ID in request
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     * @param {Function} next - Next middleware function
     */
    validateId: (req, res, next) => {
      if (!req || !req.params) {
        return res.status(400).json({
          error: 'Invalid Request',
          message: 'Request parameters are missing'
        });
      }

      const { id } = req.params;

      if (!isValidCoinId(id)) {
        return res.status(400).json({
          error: 'Invalid Parameters',
          message: 'Coin ID is required and must contain only lowercase letters, numbers, and hyphens'
        });
      }

      next();
    }
  };
}

/**
 * Validate coin object
 * @param {Object} coin - Coin object to validate
 * @returns {boolean} - Whether the coin is valid
 */
export function validateCoin(coin) {
  if (!coin) return false;

  const requiredFields = ['id', 'symbol', 'name', 'current_price', 'market_cap', 'market_cap_rank'];
  return requiredFields.every(field => 
    coin.hasOwnProperty(field) && 
    (field !== 'current_price' || typeof coin[field] === 'number') &&
    (field !== 'market_cap' || typeof coin[field] === 'number') &&
    (field !== 'market_cap_rank' || typeof coin[field] === 'number')
  );
}