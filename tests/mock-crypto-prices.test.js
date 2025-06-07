const { describe, it, expect } = require('@jest/globals');

describe('Mock Crypto Prices', () => {
  it('should have valid mock crypto price data', () => {
    const mockPrices = require('../src/data/crypto-prices.json');
    
    expect(mockPrices).toBeDefined();
    expect(Array.isArray(mockPrices)).toBe(true);
    
    mockPrices.forEach(price => {
      expect(price).toHaveProperty('id');
      expect(price).toHaveProperty('symbol');
      expect(price).toHaveProperty('current_price');
    });
  });
});