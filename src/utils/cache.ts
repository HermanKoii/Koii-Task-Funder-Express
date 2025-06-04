import NodeCache from 'node-cache';

/**
 * CacheManager provides a clean, type-safe interface for caching operations
 * Uses node-cache as the underlying caching mechanism
 */
export class CacheManager {
  private cache: NodeCache;

  /**
   * Create a new CacheManager instance
   * @param {number} [defaultTTL=300] - Default time-to-live in seconds (default 5 minutes)
   */
  constructor(defaultTTL: number = 300) {
    this.cache = new NodeCache({ 
      stdTTL: defaultTTL,
      checkperiod: defaultTTL * 0.2 // Check for expired keys periodically
    });
  }

  /**
   * Set a value in the cache
   * @param {string} key - The cache key
   * @param {T} value - The value to cache
   * @param {number} [ttl] - Optional time-to-live in seconds
   * @returns {boolean} - Whether the set was successful
   */
  set<T>(key: string, value: T, ttl?: number): boolean {
    if (!key) {
      throw new Error('Cache key cannot be empty');
    }
    return this.cache.set(key, value, ttl);
  }

  /**
   * Get a value from the cache
   * @param {string} key - The cache key to retrieve
   * @returns {T | undefined} - The cached value or undefined
   */
  get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  /**
   * Check if a key exists in the cache
   * @param {string} key - The cache key to check
   * @returns {boolean} - Whether the key exists
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Delete a key from the cache
   * @param {string} key - The cache key to delete
   * @returns {number} - Number of keys deleted
   */
  delete(key: string): number {
    return this.cache.del(key);
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.cache.flushAll();
  }

  /**
   * Get current cache statistics
   * @returns {NodeCache.Stats} - Cache statistics
   */
  getStats(): NodeCache.Stats {
    return this.cache.getStats();
  }
}

// Create a singleton instance for application-wide use
export const cacheManager = new CacheManager();

export default cacheManager;