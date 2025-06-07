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
        const requiredProps = [
            'id', 
            'symbol', 
            'name', 
            'current_price', 
            'market_cap', 
            'market_cap_rank', 
            'total_volume', 
            'price_change_percentage_24h'
        ];

        Object.values(cryptoPrices).forEach(coin => {
            requiredProps.forEach(prop => {
                expect(coin).toHaveProperty(prop);
            });
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
});