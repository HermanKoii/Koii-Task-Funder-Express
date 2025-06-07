import MarketDataCache from '../services/market-data-cache';

describe('MarketDataCache', () => {
  let marketDataCache: MarketDataCache;

  beforeEach(() => {
    // Reset singleton instance before each test
    marketDataCache = MarketDataCache.getInstance();
  });

  test('should get and set cache value', () => {
    const testKey = 'test_key';
    const testValue = { data: 'test_data' };

    marketDataCache.set(testKey, testValue);
    const retrievedValue = marketDataCache.get(testKey);

    expect(retrievedValue).toEqual(testValue);
  });

  test('should return undefined for non-existent key', () => {
    const retrievedValue = marketDataCache.get('non_existent_key');
    expect(retrievedValue).toBeUndefined();
  });

  test('should delete cache entry', () => {
    const testKey = 'delete_key';
    const testValue = { data: 'delete_data' };

    marketDataCache.set(testKey, testValue);
    const deletedCount = marketDataCache.del(testKey);

    expect(deletedCount).toBe(1);
    expect(marketDataCache.get(testKey)).toBeUndefined();
  });
});