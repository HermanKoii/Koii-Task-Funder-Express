const fs = require('fs');
const path = require('path');

describe('Crypto Prices JSON', () => {
  let cryptoPrices;

  beforeAll(() => {
    const cryptoPricesPath = path.resolve(__dirname, '../src/data/crypto-prices.json');
    cryptoPrices = JSON.parse(fs.readFileSync(cryptoPricesPath, 'utf8'));
  });

  it('should have valid crypto prices data', () => {
    expect(cryptoPrices).toBeDefined();
    expect(Array.isArray(cryptoPrices)).toBe(true);
    expect(cryptoPrices.length).toBeGreaterThan(0);
  });

  it('each crypto price entry should have required fields', () => {
    cryptoPrices.forEach(entry => {
      expect(entry).toHaveProperty('symbol');
      expect(entry).toHaveProperty('name');
      expect(entry).toHaveProperty('price');
      expect(typeof entry.price).toBe('number');
    });
  });
});