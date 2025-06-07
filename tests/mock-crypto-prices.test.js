import { describe, it, expect } from 'vitest';
import cryptoPrices from '../src/data/mock-crypto-prices.json';

const supportedCoins = ['bitcoin', 'ethereum'];

describe('Mock Cryptocurrency Prices', () => {
  it('should have valid cryptocurrency data', () => {
    // Check if all expected coins are present
    supportedCoins.forEach(coin => {
      expect(cryptoPrices).toHaveProperty(coin);
    });
  });

  it('should have correct price data structure', () => {
    supportedCoins.forEach(coinId => {
      const coin = cryptoPrices[coinId];
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

  it('should have valid numeric price data', () => {
    supportedCoins.forEach(coinId => {
      const coin = cryptoPrices[coinId];
      expect(typeof coin.current_price).toBe('number');
      expect(coin.current_price).toBeGreaterThan(0);
      
      expect(typeof coin.market_cap).toBe('number');
      expect(coin.market_cap).toBeGreaterThan(0);
      
      expect(typeof coin.total_volume).toBe('number');
      expect(coin.total_volume).toBeGreaterThan(0);
    });
  });
});