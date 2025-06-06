const fs = require('fs');
const path = require('path');

describe('Mock Crypto Prices', () => {
  let mockPrices;

  beforeAll(() => {
    const filePath = path.resolve(__dirname, '../src/data/crypto-prices.json');
    mockPrices = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  });

  it('should have initial mock data', () => {
    expect(mockPrices).toBeDefined();
    expect(Object.keys(mockPrices).length).toBeGreaterThan(0);
  });

  it('should have price for bitcoin', () => {
    expect(mockPrices.bitcoin).toBeDefined();
    expect(mockPrices.bitcoin.price).toBeGreaterThan(0);
  });
});