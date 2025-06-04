/**
 * Mock cryptocurrency details data
 * @module coinDetails
 */
const coinDetails = {
  'bitcoin': {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    description: 'Bitcoin is the first decentralized cryptocurrency.',
    homepage: 'https://bitcoin.org',
    marketCap: 1000000000000,
    currentPrice: 50000,
    priceChangePercentage24h: 2.5,
    totalVolume: 50000000000,
    circulatingSupply: 19000000,
    maxSupply: 21000000,
    high24h: 52000,
    low24h: 49000
  },
  'ethereum': {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    description: 'Ethereum is a decentralized, open-source blockchain platform.',
    homepage: 'https://ethereum.org',
    marketCap: 500000000000,
    currentPrice: 3000,
    priceChangePercentage24h: 1.8,
    totalVolume: 25000000000,
    circulatingSupply: 120000000,
    maxSupply: null,
    high24h: 3100,
    low24h: 2900
  }
};

export default coinDetails;