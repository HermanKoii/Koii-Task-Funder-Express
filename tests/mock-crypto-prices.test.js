import { describe, it, expect } from 'vitest';
import cryptoPrices from '../src/data/mock-crypto-prices.json';

describe('Mock Cryptocurrency Prices', () => {
  const supportedCoins = ['bitcoin', 'ethereum'];

  it('should have Bitcoin and Ethereum prices', () => {
    expect(cryptoPrices.bitcoin).toBeDefined();
    expect(cryptoPrices.ethereum).toBeDefined();
    expect(cryptoPrices.bitcoin.usd).toBe(50000);
    expect(cryptoPrices.ethereum.usd).toBe(3000);
  });

  it('should have supported cryptocurrency data', () => {
    // Check if all expected coins are present
    supportedCoins.forEach(coin => {
      expect(cryptoPrices).toHaveProperty(coin);
    });
  });

  it('should have correct price data structure', () => {
    Object.values(cryptoPrices).forEach(coin => {
      expect(coin).toHaveProperty('usd');
      expect(coin).toHaveProperty('eur');
      expect(coin).toHaveProperty('last_updated');
    });
  });

  it('should have valid numeric price data', () => {
    Object.values(cryptoPrices).forEach(coin => {
      expect(typeof coin.usd).toBe('number');
      expect(coin.usd).toBeGreaterThan(0);
      expect(typeof coin.eur).toBe('number');
      expect(coin.eur).toBeGreaterThan(0);
    });
  });
});