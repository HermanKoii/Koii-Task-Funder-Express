const { validateCoinId } = require('../../src/middleware/inputValidation');

describe('Input Validation Middleware', () => {
  it('should throw an error for invalid coin IDs', () => {
    expect(() => validateCoinId('')).toThrow('Coin ID is required');
    expect(() => validateCoinId(null)).toThrow('Coin ID is required');
    expect(() => validateCoinId(undefined)).toThrow('Coin ID is required');
  });

  it('should not throw an error for valid coin IDs', () => {
    expect(() => validateCoinId('bitcoin')).not.toThrow();
    expect(() => validateCoinId('ethereum')).not.toThrow();
  });
});