const createError = require('http-errors');

/**
 * Validate query parameters for coin list endpoint
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const validateCoinListParams = (req, res, next) => {
  const { 
    page = 1, 
    per_page = 100, 
    order = 'market_cap_desc',
    sparkline = false 
  } = req.query;

  // Validate page number
  const parsedPage = parseInt(page, 10);
  if (isNaN(parsedPage) || parsedPage < 1) {
    return next(createError(400, 'Invalid page number. Must be a positive integer.'));
  }

  // Validate per_page 
  const parsedPerPage = parseInt(per_page, 10);
  if (isNaN(parsedPerPage) || parsedPerPage < 1 || parsedPerPage > 250) {
    return next(createError(400, 'Invalid per_page. Must be between 1 and 250.'));
  }

  // Validate order
  const validOrders = [
    'market_cap_desc', 
    'market_cap_asc', 
    'volume_desc', 
    'volume_asc', 
    'id_desc', 
    'id_asc'
  ];
  if (!validOrders.includes(order)) {
    return next(createError(400, `Invalid order. Must be one of: ${validOrders.join(', ')}`));
  }

  // Validate sparkline
  if (typeof sparkline !== 'boolean' && sparkline !== 'true' && sparkline !== 'false') {
    return next(createError(400, 'Sparkline must be a boolean value.'));
  }

  // Attach validated and parsed values to req for downstream use
  req.validatedQuery = {
    page: parsedPage,
    per_page: parsedPerPage,
    order,
    sparkline: sparkline === 'true' || sparkline === true
  };

  next();
};

module.exports = validateCoinListParams;