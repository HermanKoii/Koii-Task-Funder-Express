const express = require('express');
const coinListData = require('../data/crypto-prices.json');
const validateCoinListParams = require('../middleware/coinListValidation');

const router = express.Router();

/**
 * Get a paginated list of cryptocurrencies
 * @route GET /coins/markets
 * @param {number} page - Page number (default: 1)
 * @param {number} per_page - Number of results per page (default: 100, max: 250)
 * @param {string} order - Sorting order (default: 'market_cap_desc')
 * @param {boolean} sparkline - Include price sparkline (default: false)
 */
router.get('/markets', validateCoinListParams, (req, res) => {
  const { 
    page, 
    per_page, 
    order, 
    sparkline 
  } = req.validatedQuery;

  // Sort and paginate coins based on query parameters
  const sortedCoins = coinListData.sort((a, b) => {
    switch (order) {
      case 'market_cap_desc':
        return b.market_cap - a.market_cap;
      case 'market_cap_asc':
        return a.market_cap - b.market_cap;
      case 'volume_desc':
        return b.total_volume - a.total_volume;
      case 'volume_asc':
        return a.total_volume - b.total_volume;
      case 'id_desc':
        return b.id.localeCompare(a.id);
      case 'id_asc':
        return a.id.localeCompare(b.id);
      default:
        return b.market_cap - a.market_cap;
    }
  });

  // Paginate results
  const startIndex = (page - 1) * per_page;
  const endIndex = startIndex + per_page;
  const paginatedCoins = sortedCoins.slice(startIndex, endIndex);

  // Optional: Remove or modify sparkline data based on parameter
  const processedCoins = paginatedCoins.map(coin => {
    const processedCoin = { ...coin };
    if (!sparkline) {
      delete processedCoin.sparkline_in_7d;
    }
    return processedCoin;
  });

  res.json(processedCoins);
});

module.exports = router;