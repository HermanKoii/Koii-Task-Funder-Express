const { describe, it, expect } = require('@jest/globals');

describe('Crypto Prices Mock', () => {
  it('should have a basic structure', () => {
    const cryptoPrices = require('../src/data/crypto-prices.json');
    expect(cryptoPrices).toBeDefined();
    expect(typeof cryptoPrices).toBe('object');
  });
});