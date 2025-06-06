import { Coin, CoinDataset } from '../types/crypto';
import cryptoData from '../data/crypto-prices.json';

/**
 * Service for retrieving cryptocurrency information
 * Implements singleton pattern with enhanced search and retrieval capabilities
 */
export class CoinService {
  private static instance: CoinService;
  private coins: Coin[];

  private constructor() {
    this.coins = (cryptoData as CoinDataset).coins;
  }

  /**
   * Singleton pattern to ensure only one instance of the service
   * @returns {CoinService} The singleton instance
   */
  public static getInstance(): CoinService {
    if (!CoinService.instance) {
      CoinService.instance = new CoinService();
    }
    return CoinService.instance;
  }

  /**
   * Retrieve a coin by its ID with enhanced error handling
   * @param {string} coinId - The unique identifier for the coin
   * @returns {Coin | undefined} The coin details or undefined if not found
   * @throws {Error} If coin ID is invalid
   */
  public getCoinById(coinId: string): Coin | undefined {
    if (!coinId) {
      throw new Error('Coin ID is required');
    }
    const normalizedId = coinId.trim().toLowerCase();
    return this.coins.find(coin => coin.id.toLowerCase() === normalizedId);
  }

  /**
   * List all available coins with optional filtering
   * @param {Object} [options] - Optional filtering parameters
   * @returns {Coin[]} Array of coins matching filter criteria
   */
  public listCoins(options?: { 
    minMarketCap?: number, 
    sortBy?: 'marketCap' | 'name' 
  }): Coin[] {
    let filteredCoins = [...this.coins];

    if (options?.minMarketCap) {
      filteredCoins = filteredCoins.filter(
        coin => coin.market_data.market_cap.usd >= options.minMarketCap
      );
    }

    if (options?.sortBy === 'marketCap') {
      filteredCoins.sort((a, b) => 
        b.market_data.market_cap.usd - a.market_data.market_cap.usd
      );
    } else if (options?.sortBy === 'name') {
      filteredCoins.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filteredCoins;
  }

  /**
   * Search coins by name or symbol with advanced matching
   * @param {string} query - Search term
   * @param {Object} [options] - Additional search options
   * @returns {Coin[]} Array of matching coins
   */
  public searchCoins(
    query: string, 
    options?: { 
      exactMatch?: boolean, 
      limit?: number 
    }
  ): Coin[] {
    if (!query) return [];
    
    const lowercaseQuery = query.toLowerCase().trim();
    const matchFunction = options?.exactMatch 
      ? (value: string) => value.toLowerCase() === lowercaseQuery
      : (value: string) => value.toLowerCase().includes(lowercaseQuery);

    const results = this.coins.filter(
      coin => 
        matchFunction(coin.name) || 
        matchFunction(coin.symbol)
    );

    return options?.limit 
      ? results.slice(0, options.limit) 
      : results;
  }
}