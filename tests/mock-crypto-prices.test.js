const { describe, it, expect } = require('@jest/globals');
const fs = require('fs');
const path = require('path');

describe('Mock Crypto Prices', () => {
  it('should have valid JSON structure', () => {
    const mockPricesPath = path.resolve(__dirname, '../src/data/crypto-prices.json');
    const mockPricesData = JSON.parse(fs.readFileSync(mockPricesPath, 'utf8'));
    
    expect(typeof mockPricesData).toBe('object');
    expect(Object.keys(mockPricesData).length).toBeGreaterThan(0);
  });
});