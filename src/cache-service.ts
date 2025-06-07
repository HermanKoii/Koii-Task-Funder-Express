import NodeCache from 'node-cache';

/**
 * CacheService provides a centralized, type-safe caching mechanism
 * using node-cache with configurable settings and enhanced functionality.
 */
class CacheService {
  private static instance: CacheService;
  private cache: NodeCache;

  /**
   * Private constructor to enforce singleton pattern
   * @param {Object} options - Optional cache configuration
   */
  private constructor(options: NodeCache.Options = {}) {
    this.cache = new NodeCache({
      stdTTL: options.stdTTL || 600, // Default 10 minutes
      checkperiod: options.checkperiod || 120, // Default 2 minutes
      useClones: true, // Prevent direct object mutations
      ...options
    });
  }

  // Rest of the implementation remains the same...
}