const fs = require('fs');
const path = require('path');

describe('Crypto Prices Mock Data', () => {
  let cryptoPrices;

  beforeAll(() => {
    const filePath = path.join(__dirname, '../src/data/crypto-prices.json');
    cryptoPrices = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });

  test('should have valid crypto price data', () => {
    expect(cryptoPrices).toBeDefined();
    expect(Array.isArray(cryptoPrices)).toBe(true);
    expect(cryptoPrices.length).toBeGreaterThan(0);
  });

  test('each crypto entry should have required fields', () => {
    cryptoPrices.forEach(crypto => {
      expect(crypto).toHaveProperty('symbol');
      expect(crypto).toHaveProperty('name');
      expect(crypto).toHaveProperty('price');
      expect(typeof crypto.price).toBe('number');
    });
  });
});