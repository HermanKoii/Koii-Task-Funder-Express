/**
 * Validate coin ID
 * @param {string} coinId - Coin identifier to validate
 * @returns {boolean} - Whether the coin ID is valid
 */
export function isValidCoinId(coinId) {
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
  try {
    if (!req || !req.params) {
      res.status(400);
      throw new Error('Request parameters are missing');
    }

    const { coinId } = req.params;

    if (!isValidCoinId(coinId)) {
      res.status(400);
      throw new Error('Invalid coin ID');
    }

    next();
  } catch (error) {
    res.json({ error: error.message });
    next(error);
  }
}

/**
 * Validate coin list parameters
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
export function validateCoinListParams(req, res, next) {
  try {
    if (!req || !req.query) {
      res.status(400);
      throw new Error('Request query parameters are missing');
    }

    const { limit, offset } = req.query;

    if (limit && (isNaN(limit) || parseInt(limit) <= 0)) {
      res.status(400);
      throw new Error('Limit must be a positive number');
    }

    if (offset && (isNaN(offset) || parseInt(offset) < 0)) {
      res.status(400);
      throw new Error('Offset must be a non-negative number');
    }

    next();
  } catch (error) {
    res.json({ error: error.message });
    next(error);
  }
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
      try {
        if (!req || !req.params) {
          res.status(400);
          throw new Error('Request parameters are missing');
        }

        const { id } = req.params;

        if (!isValidCoinId(id)) {
          res.status(400);
          throw new Error('Invalid coin ID');
        }

        next();
      } catch (error) {
        res.json({ error: error.message });
        next(error);
      }
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