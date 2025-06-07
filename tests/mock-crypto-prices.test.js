import { describe, it, expect } from 'vitest';
import mockPrices from '../src/data/mock-crypto-prices.json';

describe('Mock Crypto Prices', () => {
  it('should have bitcoin price data', () => {
    expect(mockPrices.bitcoin).toBeDefined();
    expect(mockPrices.bitcoin.id).toBe('bitcoin');
    expect(mockPrices.bitcoin.current_price).toBeGreaterThan(0);
  });

  it('should have ethereum price data', () => {
    expect(mockPrices.ethereum).toBeDefined();
    expect(mockPrices.ethereum.id).toBe('ethereum');
    expect(mockPrices.ethereum.current_price).toBeGreaterThan(0);
  });
});