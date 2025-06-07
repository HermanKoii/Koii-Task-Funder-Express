import NodeCache from 'node-cache';
import { CacheConfig } from './config/cache';

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
    const config: CacheConfig = {
      stdTTL: 600,         // Default 10 minutes
      checkperiod: 120,    // Default 2 minutes
      maxKeys: 1000,       // Default max keys
      useClones: true,     // Default clone objects
      ...options
    };

    // Validate configuration
    if (config.stdTTL && config.stdTTL < 0) {
      throw new Error('stdTTL must be a non-negative number');
    }

    if (config.maxKeys !== undefined && config.maxKeys <= 0) {
      throw new Error('maxKeys must be a positive number');
    }

    this.cache = new NodeCache({
      stdTTL: config.stdTTL,
      checkperiod: config.checkperiod,
      maxKeys: config.maxKeys,
      useClones: config.useClones
    });
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

  // Existing methods remain the same
  public set<T>(key: string, value: T, ttl?: number): boolean {
    if (!key || value === undefined) {
      throw new Error('Cache key and value are required');
    }
    return this.cache.set(key, value, ttl);
  }

  public get<T>(key: string): T | undefined {
    return this.cache.get<T>(key);
  }

  public delete(key: string): number {
    return this.cache.del(key);
  }

  public has(key: string): boolean {
    return this.cache.has(key);
  }

  public clear(): void {
    this.cache.flushAll();
  }

  public getStats(): NodeCache.Stats {
    return this.cache.getStats();
  }
}

export default CacheService;