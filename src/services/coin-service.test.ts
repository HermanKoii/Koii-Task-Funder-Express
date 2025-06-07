import { CoinService } from './coin-service';

describe('CoinService', () => {
  let coinService: CoinService;

  beforeEach(() => {
    coinService = CoinService.getInstance();
  });

  it('should be a singleton', () => {
    const anotherInstance = CoinService.getInstance();
    expect(coinService).toBe(anotherInstance);
  });

  it('should return a coin by ID', () => {
    const bitcoin = coinService.getCoinById('bitcoin');
    expect(bitcoin).toBeDefined();
    expect(bitcoin?.id).toBe('bitcoin');
  });

  it('should return undefined for non-existent coin', () => {
    const nonExistentCoin = coinService.getCoinById('non-existent-coin');
    expect(nonExistentCoin).toBeUndefined();
  });

  it('should list all coins', () => {
    const coins = coinService.listCoins();
    expect(Array.isArray(coins)).toBe(true);
    expect(coins.length).toBeGreaterThan(0);
  });

  it('should search coins by name or symbol', () => {
    const bitcoinResults = coinService.searchCoins('bitcoin');
    expect(bitcoinResults.length).toBeGreaterThan(0);
    expect(bitcoinResults[0].id).toBe('bitcoin');

    const ethResults = coinService.searchCoins('eth');
    expect(ethResults.length).toBeGreaterThan(0);
    expect(ethResults[0].symbol).toBe('eth');
  });
});