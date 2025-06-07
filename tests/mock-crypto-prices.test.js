const cryptoPrices = require('../src/data/crypto-prices.json');

describe('Mock Cryptocurrency Prices', () => {
    // Test that the mock data has the expected structure
    it('should have valid cryptocurrency data', () => {
        const supportedCoins = ['bitcoin', 'ethereum', 'dogecoin', 'cardano'];
        
        // Check if all expected coins are present
        supportedCoins.forEach(coin => {
            expect(cryptoPrices).toHaveProperty(coin);
        });
    });

    // Validate each cryptocurrency object
    it('should have correct price data structure', () => {
        Object.values(cryptoPrices).forEach(coin => {
            expect(coin).toHaveProperty('id');
            expect(coin).toHaveProperty('symbol');
            expect(coin).toHaveProperty('name');
            expect(coin).toHaveProperty('current_price');
            expect(coin).toHaveProperty('market_cap');
            expect(coin).toHaveProperty('market_cap_rank');
            expect(coin).toHaveProperty('total_volume');
            expect(coin).toHaveProperty('price_change_percentage_24h');
            expect(coin).toHaveProperty('last_updated');
        });
    });

    // Check that prices are valid numbers
    it('should have valid numeric price data', () => {
        Object.values(cryptoPrices).forEach(coin => {
            expect(typeof coin.current_price).toBe('number');
            expect(coin.current_price).toBeGreaterThan(0);
            
            expect(typeof coin.market_cap).toBe('number');
            expect(coin.market_cap).toBeGreaterThan(0);
            
            expect(typeof coin.total_volume).toBe('number');
            expect(coin.total_volume).toBeGreaterThan(0);
        });
    });

    // Check last_updated format
    it('should have valid last_updated timestamp', () => {
        Object.values(cryptoPrices).forEach(coin => {
            expect(coin.last_updated).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
        });
    });
});