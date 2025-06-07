import { describe, it, expect } from 'vitest';
import cryptoPrices from '../src/data/mock-crypto-prices.json';

describe('Mock Cryptocurrency Prices', () => {
  const supportedCoins = ['bitcoin', 'ethereum'];

  it('should have valid cryptocurrency data', () => {
    // Check if all expected coins are present
    supportedCoins.forEach(coin => {
      expect(cryptoPrices).toHaveProperty(coin);
    });
  });

  it('should have correct price data structure', () => {
    Object.values(cryptoPrices).forEach(coin => {
      expect(coin).toHaveProperty('id');
      expect(coin).toHaveProperty('symbol');
      expect(coin).toHaveProperty('name');
      expect(coin).toHaveProperty('current_price');
      expect(coin).toHaveProperty('market_cap');
      expect(coin).toHaveProperty('market_cap_rank');
      expect(coin).toHaveProperty('total_volume');
      expect(coin).toHaveProperty('price_change_percentage_24h');
    });
  });
});