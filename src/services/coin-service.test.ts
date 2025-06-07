import { CoinService } from './coin-service';
import * as cryptoData from '../data/crypto-prices.json';

describe('CoinService', () => {
  let coinService: CoinService;

  beforeEach(() => {
    coinService = CoinService.getInstance();
  });

  it('should be a singleton', () => {
    const anotherInstance = CoinService.getInstance();
    expect(coinService).toBe(anotherInstance);
  });

  it('should list all coins', () => {
    const coins = coinService.listCoins();
    expect(coins.length).toBe(cryptoData.coins.length);
  });

  it('should get coin by ID', () => {
    const testCoin = cryptoData.coins[0];
    const retrievedCoin = coinService.getCoinById(testCoin.id);
    expect(retrievedCoin).toEqual(testCoin);
  });

  it('should search coins by name', () => {
    const searchResults = coinService.searchCoins('bitcoin');
    expect(searchResults.length).toBeGreaterThan(0);
    searchResults.forEach(coin => {
      expect(coin.name.toLowerCase()).toContain('bitcoin');
    });
  });

  it('should throw error for empty coin ID', () => {
    expect(() => coinService.getCoinById('')).toThrow('Coin ID is required');
  });
});