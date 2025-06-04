import NodeCache from 'node-cache';

/**
 * Create a singleton cache instance with configurable settings
 * @param {Object} options - Optional cache configuration
 * @returns {NodeCache} Configured cache instance
 */
export const createCache = (options = {}) => {
  const defaultOptions = {
    stdTTL: 600, // Default 10-minute cache
    checkperiod: 120, // Check for expired keys every 2 minutes
    useClones: false, // Improve performance by not cloning values
  };

  const mergedOptions = { ...defaultOptions, ...options };
  return new NodeCache(mergedOptions);
};

/**
 * Wrapper class for cache operations with additional error handling
 */
export class CacheManager {
  constructor(cache) {
    this.cache = cache || createCache();
  }

  /**
   * Set a value in the cache
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} [ttl] - Optional time-to-live in seconds
   * @returns {boolean} Success status of cache operation
   */
  set(key, value, ttl) {
    if (!key) {
      console.warn('Cache: Invalid key provided');
      return false;
    }
    return this.cache.set(key, value, ttl);
  }

  /**
   * Get a value from the cache
   * @param {string} key - Cache key
   * @returns {*} Cached value or undefined
   */
  get(key) {
    if (!key) {
      console.warn('Cache: Invalid key provided');
      return undefined;
    }
    return this.cache.get(key);
  }

  /**
   * Delete a key from the cache
   * @param {string} key - Cache key to delete
   * @returns {number} Number of keys deleted
   */
  delete(key) {
    if (!key) {
      console.warn('Cache: Invalid key provided');
      return 0;
    }
    return this.cache.del(key);
  }

  /**
   * Clear entire cache
   */
  clear() {
    this.cache.flushAll();
  }
}

// Create a default cache instance
export const defaultCache = new CacheManager(createCache());