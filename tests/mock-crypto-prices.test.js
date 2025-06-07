const cryptoPrices = require('../src/data/crypto-prices.json');

describe('Crypto Prices Mock Data', () => {
  it('should have valid crypto price data', () => {
    expect(cryptoPrices).toBeDefined();
    expect(Array.isArray(cryptoPrices)).toBe(true);
    expect(cryptoPrices.length).toBeGreaterThan(0);
  });

  it('should have each crypto entry with required fields', () => {
    cryptoPrices.forEach(crypto => {
      expect(crypto).toHaveProperty('symbol');
      expect(crypto).toHaveProperty('price');
      expect(typeof crypto.price).toBe('number');
    });
  });
});