import NodeCache from 'node-cache';
import { CacheConfig, createCache } from './config/cache';

/**
 * CacheService provides a centralized, type-safe caching mechanism
 * using node-cache with configurable settings.
 */
class CacheService {
  private static instance: CacheService;
  private cache: NodeCache;

  /**
   * Private constructor to enforce singleton pattern
   * @param {CacheConfig} options - Optional cache configuration
   */
  private constructor(options: CacheConfig = {}) {
    this.cache = createCache(options);
  }

  /**
   * Get singleton instance of CacheService
   * @param {CacheConfig} options - Optional cache configuration
   * @returns {CacheService} Singleton cache service instance
   */
  public static getInstance(options: CacheConfig = {}): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService(options);
    }
    return CacheService.instance;
  }

  /**
   * Set a value in the cache
   * @param {string} key - Cache key
   * @param {T} value - Value to cache
   * @param {number} ttl - Optional time-to-live in seconds
   * @returns {boolean} Success status
   */
  public set<T>(key: string, value: T, ttl?: number): boolean {
    if (!key || value === undefined) {
      throw new Error('Cache key and value are required');
    }
    return this.cache.set(key, value, ttl);
  }

  /**
   * Get a value from the cache
   * @param {string} key - Cache key
   * @returns {T | undefined} Cached value or undefined
   */
  public get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  /**
   * Delete a key from the cache
   * @param {string} key - Cache key to delete
   * @returns {number} Number of keys deleted
   */
  public delete(key: string): number {
    return this.cache.del(key);
  }

  /**
   * Check if a key exists in the cache
   * @param {string} key - Cache key to check
   * @returns {boolean} Existence of key
   */
  public has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Clear entire cache
   */
  public clear(): void {
    this.cache.flushAll();
  }

  /**
   * Get cache statistics
   * @returns {NodeCache.Stats} Cache usage statistics
   */
  public getStats(): NodeCache.Stats {
    return this.cache.getStats();
  }
}

export default CacheService;