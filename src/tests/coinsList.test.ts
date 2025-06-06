import { describe, it, expect } from 'vitest';
import { getCoins } from '../services/coinsService'; // Assuming this is the service handling coins list
import { CoinData } from '../types/coinTypes'; // Import the type definition

describe('Coins List Endpoint', () => {
  // Test successful retrieval of coins list
  it('should return a non-empty array of coins', async () => {
    const coinsList = await getCoins();
    
    expect(coinsList).toBeDefined();
    expect(Array.isArray(coinsList)).toBe(true);
    expect(coinsList.length).toBeGreaterThan(0);
  });

  // Test coin data structure
  it('should have correct coin data structure', async () => {
    const coinsList = await getCoins();
    const firstCoin = coinsList[0];

    expect(firstCoin).toHaveProperty('id');
    expect(firstCoin).toHaveProperty('symbol');
    expect(firstCoin).toHaveProperty('name');
    expect(typeof firstCoin.id).toBe('string');
    expect(typeof firstCoin.symbol).toBe('string');
    expect(typeof firstCoin.name).toBe('string');
  });

  // Test pagination (if implemented)
  it('should support optional pagination', async () => {
    const defaultList = await getCoins();
    const paginatedList = await getCoins({ page: 1, perPage: 10 });

    expect(paginatedList.length).toBeLessThanOrEqual(10);
    expect(paginatedList.length).toBeGreaterThan(0);
  });

  // Test error handling for invalid pagination
  it('should handle invalid pagination gracefully', async () => {
    await expect(getCoins({ page: -1, perPage: 0 }))
      .rejects
      .toThrow('Invalid pagination parameters');
  });

  // Test caching or performance (optional)
  it('should have consistent results on repeated calls', async () => {
    const firstCall = await getCoins();
    const secondCall = await getCoins();

    expect(firstCall).toEqual(secondCall);
  });
});