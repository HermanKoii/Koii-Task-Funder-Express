import NodeCache from 'node-cache';

/**
 * CacheManager provides a clean, centralized interface for caching operations
 * with built-in error handling and configuration options.
 */
class CacheManager {
  /**
   * Create a new cache instance
   * @param {Object} [options] - Cache configuration options
   * @param {number} [options.stdTTL=600] - Standard time to live in seconds (default: 10 minutes)
   * @param {number} [options.checkperiod=120] - Periodic check for expired keys (default: 2 minutes)
   */
  constructor(options = {}) {
    const defaultOptions = {
      stdTTL: 600,
      checkperiod: 120,
    };

    this.cache = new NodeCache({
      ...defaultOptions,
      ...options,
    });
  }

  /**
   * Set a value in the cache
   * @param {string} key - Unique cache key
   * @param {any} value - Value to cache
   * @param {number} [ttl] - Optional time to live in seconds
   * @returns {boolean} - Whether the set operation was successful
   */
  set(key, value, ttl) {
    if (!key) {
      throw new Error('Cache key is required');
    }

    try {
      return this.cache.set(key, value, ttl);
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Get a value from the cache
   * @param {string} key - Unique cache key
   * @returns {any} - Cached value or undefined
   */
  get(key) {
    if (!key) {
      throw new Error('Cache key is required');
    }

    try {
      return this.cache.get(key);
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error);
      return undefined;
    }
  }

  /**
   * Delete a key from the cache
   * @param {string} key - Unique cache key
   * @returns {number} - Number of keys deleted
   */
  delete(key) {
    if (!key) {
      throw new Error('Cache key is required');
    }

    try {
      return this.cache.del(key);
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error);
      return 0;
    }
  }

  /**
   * Check if a key exists in the cache
   * @param {string} key - Unique cache key
   * @returns {boolean} - Whether the key exists
   */
  has(key) {
    if (!key) {
      throw new Error('Cache key is required');
    }

    try {
      return this.cache.has(key);
    } catch (error) {
      console.error(`Cache has error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Clear the entire cache
   * @returns {void}
   */
  clear() {
    try {
      this.cache.flushAll();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  /**
   * Get cache statistics
   * @returns {Object} - Cache statistics
   */
  stats() {
    return this.cache.getStats();
  }
}

export default CacheManager;