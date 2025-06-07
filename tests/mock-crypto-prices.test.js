const fs = require('fs');
const path = require('path');

describe('Mock Crypto Prices', () => {
  test('crypto prices JSON file should be valid', () => {
    const cryptoPricesPath = path.resolve(__dirname, '../src/data/crypto-prices.json');
    const cryptoPricesData = JSON.parse(fs.readFileSync(cryptoPricesPath, 'utf8'));
    
    expect(cryptoPricesData).toBeDefined();
    expect(typeof cryptoPricesData).toBe('object');
  });
});