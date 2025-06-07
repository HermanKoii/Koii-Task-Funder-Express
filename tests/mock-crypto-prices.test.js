const fs = require('fs');
const path = require('path');

describe('Crypto Prices JSON', () => {
  let cryptoPrices;

  beforeAll(() => {
    const filePath = path.resolve(__dirname, '../src/data/crypto-prices.json');
    cryptoPrices = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });

  it('should have valid crypto price data', () => {
    expect(cryptoPrices).toBeDefined();
    expect(typeof cryptoPrices).toBe('object');
    
    // Check that we have at least one cryptocurrency
    expect(Object.keys(cryptoPrices).length).toBeGreaterThan(0);
    
    // Check that each cryptocurrency has a price
    Object.values(cryptoPrices).forEach(price => {
      expect(typeof price).toBe('number');
      expect(price).toBeGreaterThan(0);
    });
  });
});