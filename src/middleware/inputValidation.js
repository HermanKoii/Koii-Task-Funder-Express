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
    const error = new Error('Request parameters are missing');
    error.status = 400;
    return next(error);
  }

  const { coinId } = req.params;

  if (!isValidCoinId(coinId)) {
    const error = new Error('Invalid coin ID');
    error.status = 400;
    return next(error);
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
    const error = new Error('Request query parameters are missing');
    error.status = 400;
    return next(error);
  }

  const { limit, offset } = req.query;

  if (limit && (isNaN(limit) || parseInt(limit) <= 0)) {
    const error = new Error('Limit must be a positive number');
    error.status = 400;
    return next(error);
  }

  if (offset && (isNaN(offset) || parseInt(offset) < 0)) {
    const error = new Error('Offset must be a non-negative number');
    error.status = 400;
    return next(error);
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
        const error = new Error('Request parameters are missing');
        error.status = 400;
        return next(error);
      }

      const { id } = req.params;

      if (!isValidCoinId(id)) {
        const error = new Error('Invalid coin ID');
        error.status = 400;
        return next(error);
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

  const requiredFields = [
    'id', 'symbol', 'name', 'current_price', 
    'market_cap', 'market_cap_rank', 
    'total_volume', 'price_change_percentage_24h', 
    'last_updated'
  ];

  return requiredFields.every(field => 
    coin.hasOwnProperty(field) && 
    (field !== 'current_price' || typeof coin[field] === 'number') &&
    (field !== 'market_cap' || typeof coin[field] === 'number') &&
    (field !== 'market_cap_rank' || typeof coin[field] === 'number') &&
    (field !== 'total_volume' || typeof coin[field] === 'number') &&
    (field !== 'price_change_percentage_24h' || typeof coin[field] === 'number')
  );
}