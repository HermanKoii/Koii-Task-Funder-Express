const { describe, it, expect } = require('@jest/globals');

describe('Crypto Prices', () => {
  it('should have valid crypto prices', () => {
    const cryptoPrices = require('../src/data/crypto-prices.json');
    expect(cryptoPrices).toBeDefined();
    expect(Object.keys(cryptoPrices).length).toBeGreaterThan(0);
  });
});