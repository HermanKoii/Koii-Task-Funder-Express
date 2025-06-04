import { describe, it, expect, beforeEach } from 'vitest';
import { CacheManager } from './cache';

describe('CacheManager', () => {
  let cacheManager: CacheManager;

  beforeEach(() => {
    cacheManager = new CacheManager(1); // Short TTL for testing
  });

  it('should set and get a value', () => {
    const key = 'testKey';
    const value = { data: 'testValue' };
    
    const setResult = cacheManager.set(key, value);
    expect(setResult).toBe(true);
    
    const retrievedValue = cacheManager.get(key);
    expect(retrievedValue).toEqual(value);
  });

  it('should throw an error when setting with empty key', () => {
    expect(() => cacheManager.set('', 'value')).toThrow('Cache key cannot be empty');
  });

  it('should check if a key exists', () => {
    const key = 'existingKey';
    cacheManager.set(key, 'someValue');
    
    expect(cacheManager.has(key)).toBe(true);
    expect(cacheManager.has('nonExistentKey')).toBe(false);
  });

  it('should delete a key', () => {
    const key = 'deleteKey';
    cacheManager.set(key, 'value');
    
    const deletedCount = cacheManager.delete(key);
    expect(deletedCount).toBe(1);
    expect(cacheManager.get(key)).toBeUndefined();
  });

  it('should clear the entire cache', () => {
    cacheManager.set('key1', 'value1');
    cacheManager.set('key2', 'value2');
    
    cacheManager.clear();
    
    expect(cacheManager.get('key1')).toBeUndefined();
    expect(cacheManager.get('key2')).toBeUndefined();
  });

  it('should get cache statistics', () => {
    const key = 'statsKey';
    cacheManager.set(key, 'value');
    
    const stats = cacheManager.getStats();
    expect(stats).toHaveProperty('keys');
    expect(stats).toHaveProperty('hits');
    expect(stats).toHaveProperty('misses');
  });
});