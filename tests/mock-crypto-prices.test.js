const fs = require('fs');
const path = require('path');

describe('Crypto Prices Mock Data', () => {
  let cryptoPricesData;

  beforeEach(() => {
    const filePath = path.join(__dirname, '../src/data/crypto-prices.json');
    cryptoPricesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });

  it('should have valid crypto price data', () => {
    expect(cryptoPricesData).toBeDefined();
    expect(Array.isArray(cryptoPricesData)).toBe(true);
    expect(cryptoPricesData.length).toBeGreaterThan(0);
  });

  it('each crypto entry should have required fields', () => {
    cryptoPricesData.forEach(crypto => {
      expect(crypto).toHaveProperty('symbol');
      expect(crypto).toHaveProperty('price');
      expect(typeof crypto.symbol).toBe('string');
      expect(typeof crypto.price).toBe('number');
    });
  });
});