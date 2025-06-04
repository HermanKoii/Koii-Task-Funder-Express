import { describe, it, expect, beforeEach } from 'vitest';
import CacheManager from './cache.js';

describe('CacheManager', () => {
  let cacheManager;

  beforeEach(() => {
    cacheManager = new CacheManager({ stdTTL: 1 }); // Short TTL for testing
  });

  it('should set and get a value', () => {
    const key = 'testKey';
    const value = { data: 'testValue' };
    
    const setResult = cacheManager.set(key, value);
    expect(setResult).toBe(true);

    const retrievedValue = cacheManager.get(key);
    expect(retrievedValue).toEqual(value);
  });

  it('should throw an error when setting/getting with no key', () => {
    expect(() => cacheManager.set()).toThrow('Cache key is required');
    expect(() => cacheManager.get()).toThrow('Cache key is required');
  });

  it('should return undefined for non-existent key', () => {
    const value = cacheManager.get('nonexistentKey');
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

  it('should check key existence', () => {
    const key = 'existenceKey';
    cacheManager.set(key, 'value');
    
    expect(cacheManager.has(key)).toBe(true);
    expect(cacheManager.has('nonexistentKey')).toBe(false);
  });

  it('should clear the entire cache', () => {
    cacheManager.set('key1', 'value1');
    cacheManager.set('key2', 'value2');

    cacheManager.clear();

    expect(cacheManager.get('key1')).toBeUndefined();
    expect(cacheManager.get('key2')).toBeUndefined();
  });

  it('should return cache statistics', () => {
    const stats = cacheManager.stats();
    expect(stats).toHaveProperty('keys');
    expect(stats).toHaveProperty('hits');
    expect(stats).toHaveProperty('misses');
  });
});