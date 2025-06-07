/**
 * Validate coin ID input
 * @param {string} coinId - The ID of the coin to validate
 * @throws {Error} If coin ID is invalid
 */
function validateCoinId(coinId) {
  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    throw new Error('Coin ID is required');
  }
}

module.exports = { validateCoinId };