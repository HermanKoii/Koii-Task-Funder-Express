import { describe, it, expect, beforeEach } from '@jest/globals';
import MarketDataCache from '../services/market-data-cache';

describe('MarketDataCache', () => {
  let marketDataCache: MarketDataCache;

  beforeEach(() => {
    marketDataCache = MarketDataCache.getInstance();
    marketDataCache.flush(); // Clear cache before each test
  });

  it('should be a singleton', () => {
    const anotherInstance = MarketDataCache.getInstance();
    expect(marketDataCache).toBe(anotherInstance);
  });

  it('should set and get cache entries', () => {
    const key = 'test_key';
    const value = { data: 'test_value' };
    
    marketDataCache.set(key, value);
    const retrievedValue = marketDataCache.get(key);
    
    expect(retrievedValue).toEqual(value);
  });

  it('should delete specific cache entry', () => {
    const key = 'delete_key';
    const value = { data: 'delete_value' };
    
    marketDataCache.set(key, value);
    const deletedCount = marketDataCache.del(key);
    
    expect(deletedCount).toBe(1);
    expect(marketDataCache.get(key)).toBeUndefined();
  });
});