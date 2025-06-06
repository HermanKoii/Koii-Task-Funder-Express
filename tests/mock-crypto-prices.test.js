const { describe, it, expect } = require('jest');

describe('Mock Crypto Prices', () => {
  it('should have initial mock data', () => {
    const mockPrices = require('../src/data/crypto-prices.json');
    
    expect(mockPrices).toBeDefined();
    expect(Object.keys(mockPrices).length).toBeGreaterThan(0);
  });

  it('should have price for bitcoin', () => {
    const mockPrices = require('../src/data/crypto-prices.json');
    
    expect(mockPrices.bitcoin).toBeDefined();
    expect(mockPrices.bitcoin.price).toBeGreaterThan(0);
  });
});