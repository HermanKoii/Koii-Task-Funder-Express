import { describe, it, expect, beforeEach } from 'vitest';
import { createCache, CacheManager, defaultCache } from './cache.js';

describe('Cache Utility', () => {
  let cacheManager;

  beforeEach(() => {
    cacheManager = new CacheManager();
    cacheManager.clear();
  });

  it('should set and get a value', () => {
    const key = 'testKey';
    const value = { data: 'testValue' };
    
    const setResult = cacheManager.set(key, value);
    expect(setResult).toBe(true);

    const retrievedValue = cacheManager.get(key);
    expect(retrievedValue).toEqual(value);
  });

  it('should return undefined for non-existent keys', () => {
    const value = cacheManager.get('nonExistentKey');
    expect(value).toBeUndefined();
  });

  it('should delete a key', () => {
    const key = 'deleteKey';
    cacheManager.set(key, 'value');
    
    const deleteResult = cacheManager.delete(key);
    expect(deleteResult).toBe(1);

    const retrievedValue = cacheManager.get(key);
    expect(retrievedValue).toBeUndefined();
  });

  it('should handle invalid keys gracefully', () => {
    const setResult = cacheManager.set(null, 'value');
    const getResult = cacheManager.get(null);
    const deleteResult = cacheManager.delete(null);

    expect(setResult).toBe(false);
    expect(getResult).toBeUndefined();
    expect(deleteResult).toBe(0);
  });

  it('should create a cache with custom options', () => {
    const customCache = createCache({ stdTTL: 5 });
    const cacheManager = new CacheManager(customCache);

    cacheManager.set('key', 'value');
    expect(cacheManager.get('key')).toBe('value');
  });

  it('should use default cache instance', () => {
    defaultCache.set('defaultKey', 'defaultValue');
    const value = defaultCache.get('defaultKey');
    expect(value).toBe('defaultValue');
  });
});