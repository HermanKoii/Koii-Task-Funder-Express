/**
 * Validates a coin ID parameter
 * @param {string} coinId - The coin identifier to validate
 * @returns {boolean} Whether the coin ID is valid
 */
export function validateCoinId(coinId) {
  // Check if input is not a string or is an empty string
  if (typeof coinId !== 'string' || coinId.trim() === '') {
    return false;
  }

  // Convert to lowercase for case-insensitive matching
  const normalizedId = coinId.toLowerCase().trim();

  // Additional validation rules can be added here
  // For example, check against a list of known coin IDs or regex pattern
  const validCoinIdPattern = /^[a-z0-9-]+$/;
  return validCoinIdPattern.test(normalizedId);
}

/**
 * Sanitizes and normalizes a coin ID
 * @param {string} coinId - The coin identifier to sanitize
 * @returns {string} Normalized coin ID
 */
export function sanitizeCoinId(coinId) {
  if (!validateCoinId(coinId)) {
    throw new Error('Invalid coin ID');
  }
  return coinId.toLowerCase().trim();
}