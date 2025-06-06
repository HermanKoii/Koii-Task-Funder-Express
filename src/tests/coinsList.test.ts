import { describe, it, expect } from 'vitest';
import { getCoins } from '../services/coinsService';
import { CoinData, PaginationOptions } from '../types/coinTypes';

describe('Coins List Endpoint', () => {
  // Test successful retrieval of coins list
  it('should return a non-empty array of coins', async () => {
    const coinsList = await getCoins();
    
    expect(coinsList).toBeDefined();
    expect(Array.isArray(coinsList)).toBe(true);
    expect(coinsList.length).toBeGreaterThan(0);
  });

  // Comprehensive coin data structure validation
  it('should have complete coin data structure', async () => {
    const coinsList = await getCoins();
    const firstCoin = coinsList[0];

    expect(firstCoin).toHaveProperty('id');
    expect(firstCoin).toHaveProperty('symbol');
    expect(firstCoin).toHaveProperty('name');
    expect(firstCoin).toHaveProperty('description');
    expect(firstCoin).toHaveProperty('price');

    expect(typeof firstCoin.id).toBe('string');
    expect(typeof firstCoin.symbol).toBe('string');
    expect(typeof firstCoin.name).toBe('string');
    expect(typeof firstCoin.description).toBe('string');
    expect(typeof firstCoin.price).toBe('number');
  });

  // Advanced pagination tests
  describe('Pagination', () => {
    it('should support optional pagination', async () => {
      const paginationOptions: PaginationOptions = { 
        page: 1, 
        perPage: 10,
        sortBy: 'marketCap',
        sortOrder: 'desc'
      };

      const paginatedList = await getCoins(paginationOptions);

      expect(paginatedList.length).toBeLessThanOrEqual(10);
      expect(paginatedList.length).toBeGreaterThan(0);
    });

    it('should handle invalid pagination gracefully', async () => {
      await expect(getCoins({ page: -1, perPage: 0 }))
        .rejects
        .toThrow('Invalid pagination parameters');
    });
  });

  // Performance and caching tests
  it('should have consistent results on repeated calls', async () => {
    const firstCall = await getCoins();
    const secondCall = await getCoins();

    expect(firstCall).toEqual(secondCall);
  });

  // Error handling test
  it('should handle service-level errors', async () => {
    // Simulate a service-level error (mock implementation)
    const mockGetCoins = () => { 
      throw new Error('Service unavailable'); 
    };

    await expect(mockGetCoins())
      .rejects
      .toThrow('Service unavailable');
  });
});