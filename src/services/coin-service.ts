import { Coin, CoinDataset } from '../types/crypto';
import cryptoData from '../data/crypto-prices.json';

/**
 * Service for retrieving cryptocurrency information
 * Enhanced with additional functionality and error handling
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
   * Retrieve a coin by its ID
   * @param {string} coinId - The unique identifier for the coin
   * @returns {Coin | undefined} The coin details or undefined if not found
   * @throws {Error} If coin ID is invalid
   */
  public getCoinById(coinId: string): Coin | undefined {
    if (!coinId) {
      throw new Error('Coin ID is required');
    }
    
    // Improved case-insensitive and trimmed search
    const normalizedCoinId = coinId.trim().toLowerCase();
    return this.coins.find(coin => coin.id.toLowerCase() === normalizedCoinId);
  }

  /**
   * List all available coins
   * @returns {Coin[]} Array of all coins
   */
  public listCoins(): Coin[] {
    return [...this.coins]; // Return a copy to prevent direct mutation
  }

  /**
   * Search coins by name or symbol
   * @param {string} query - Search term
   * @returns {Coin[]} Array of matching coins
   */
  public searchCoins(query: string): Coin[] {
    if (!query) return [];
    
    const lowercaseQuery = query.trim().toLowerCase();
    return this.coins.filter(
      coin => 
        coin.name.toLowerCase().includes(lowercaseQuery) || 
        coin.symbol.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Get top coins by market cap
   * @param {number} limit - Number of top coins to return (default: 10)
   * @returns {Coin[]} Array of top coins sorted by market cap
   */
  public getTopCoins(limit: number = 10): Coin[] {
    return this.coins
      .sort((a, b) => b.market_data.market_cap.usd - a.market_data.market_cap.usd)
      .slice(0, limit);
  }
}