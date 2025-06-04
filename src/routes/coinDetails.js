const express = require('express');
const router = express.Router();
const validateCoinDetails = require('../middleware/coinDetailsValidation');
const mockCoins = require('../data/mockCoins');

/**
 * Get coin details by coin ID
 * Uses validation middleware to ensure coin ID is valid
 * @route GET /coins/:coinId
 */
router.get('/:coinId', validateCoinDetails, (req, res) => {
  const coinId = req.params.coinId.toLowerCase();

  // Find the coin in mock data
  const coin = mockCoins.find(c => c.id === coinId);

  // If coin not found, return 404
  if (!coin) {
    return res.status(404).json({
      error: 'Coin not found',
      message: `No coin found with ID: ${coinId}`
    });
  }

  // Return coin details
  res.json(coin);
});

module.exports = router;