const fs = require('fs');
const path = require('path');

describe('Crypto Prices Mock Data', () => {
  let cryptoPricesData;

  beforeAll(() => {
    const filePath = path.resolve(__dirname, '../src/data/crypto-prices.json');
    cryptoPricesData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });

  it('should have valid crypto prices data', () => {
    expect(cryptoPricesData).toBeDefined();
    expect(typeof cryptoPricesData).toBe('object');
    expect(Object.keys(cryptoPricesData).length).toBeGreaterThan(0);
  });

  it('each crypto entry should have required fields', () => {
    Object.values(cryptoPricesData).forEach(crypto => {
      expect(crypto).toHaveProperty('id');
      expect(crypto).toHaveProperty('name');
      expect(crypto).toHaveProperty('current_price');
      expect(typeof crypto.current_price).toBe('number');
    });
  });
});