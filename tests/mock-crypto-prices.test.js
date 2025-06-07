const fs = require('fs');
const path = require('path');

describe('Crypto Prices Mock Data', () => {
  let cryptoData;

  beforeAll(() => {
    const dataPath = path.resolve(__dirname, '../src/data/crypto-prices.json');
    cryptoData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  });

  it('should have a valid coins array', () => {
    expect(cryptoData).toHaveProperty('coins');
    expect(Array.isArray(cryptoData.coins)).toBe(true);
    expect(cryptoData.coins.length).toBeGreaterThan(0);
  });

  it('each coin should have required properties', () => {
    cryptoData.coins.forEach(coin => {
      expect(coin).toHaveProperty('id');
      expect(coin).toHaveProperty('symbol');
      expect(coin).toHaveProperty('name');
      expect(coin).toHaveProperty('description');
    });
  });
});