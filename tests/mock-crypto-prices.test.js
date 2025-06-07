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
    expect(typeof cryptoPrices).toBe('object');
    expect(Object.keys(cryptoPrices).length).toBeGreaterThan(0);
  });

  test('each crypto entry should have required fields', () => {
    Object.values(cryptoPrices).forEach(crypto => {
      expect(crypto).toHaveProperty('id');
      expect(crypto).toHaveProperty('symbol');
      expect(crypto).toHaveProperty('name');
      expect(crypto).toHaveProperty('current_price');
      expect(typeof crypto.current_price).toBe('number');
    });
  });
});