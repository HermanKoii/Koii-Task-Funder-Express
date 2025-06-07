const { describe, it, expect } = require('@jest/globals');
const cryptoPrices = require('../src/data/crypto-prices.json');

describe('Crypto Prices Mock Data', () => {
  it('should have coins data', () => {
    expect(cryptoPrices).toBeDefined();
    expect(cryptoPrices.coins).toBeDefined();
    expect(Array.isArray(cryptoPrices.coins)).toBe(true);
  });

  it('should have coins with required fields', () => {
    cryptoPrices.coins.forEach(coin => {
      expect(coin).toHaveProperty('id');
      expect(coin).toHaveProperty('name');
      expect(coin).toHaveProperty('symbol');
    });
  });
});