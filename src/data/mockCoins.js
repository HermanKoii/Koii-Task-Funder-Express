// Mock coin data for testing
const mockCoins = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://example.com/bitcoin.png',
    current_price: 50000,
    market_cap: 1000000000000,
    market_cap_rank: 1,
    fully_diluted_valuation: 1100000000000,
    total_volume: 50000000000,
    high_24h: 52000,
    low_24h: 48000,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://example.com/ethereum.png',
    current_price: 3000,
    market_cap: 500000000000,
    market_cap_rank: 2,
    fully_diluted_valuation: 550000000000,
    total_volume: 25000000000,
    high_24h: 3200,
    low_24h: 2900,
  }
];

module.exports = mockCoins;