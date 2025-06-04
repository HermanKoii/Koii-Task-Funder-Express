import express from 'express';
import coinDetails from '../data/coinDetails.js';

/**
 * Router for cryptocurrency details endpoints
 * @module coinDetailsRouter
 */
const router = express.Router();

/**
 * Get detailed information for a specific cryptocurrency
 * @route GET /coins/:id
 * @param {string} id - Cryptocurrency ID
 * @returns {Object} Cryptocurrency details
 */
router.get('/:id', (req, res) => {
  const { id } = req.params;

  // Validate input
  if (!id) {
    return res.status(400).json({
      error: 'Coin ID is required',
      code: 'INVALID_INPUT'
    });
  }

  // Normalize id to lowercase for case-insensitive lookup
  const normalizedId = id.toLowerCase();

  // Check if coin exists
  const coinDetail = coinDetails[normalizedId];
  if (!coinDetail) {
    return res.status(404).json({
      error: 'Cryptocurrency not found',
      code: 'COIN_NOT_FOUND',
      id: normalizedId
    });
  }

  // Return coin details
  res.json(coinDetail);
});

export default router;