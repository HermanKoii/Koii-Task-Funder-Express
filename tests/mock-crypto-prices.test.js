import { describe, it, expect } from 'vitest';
import cryptoPrices from '../src/data/mock-crypto-prices.json' assert { type: 'json' };

describe('Mock Cryptocurrency Prices', () => {
    // Test that the mock data has the expected structure
    it('should have valid cryptocurrency data', () => {
        const supportedCoins = ['bitcoin', 'ethereum', 'cardano'];
        
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
            expect(coin).toHaveProperty('usd');
            expect(coin).toHaveProperty('eur');
            expect(coin).toHaveProperty('jpy');
        });
    });

    // Check that prices are valid numbers
    it('should have valid numeric price data', () => {
        Object.values(cryptoPrices).forEach(coin => {
            expect(typeof coin.current_price).toBe('number');
            expect(coin.current_price).toBeGreaterThan(0);
            
            expect(typeof coin.usd).toBe('number');
            expect(coin.usd).toBeGreaterThan(0);
            
            expect(typeof coin.eur).toBe('number');
            expect(coin.eur).toBeGreaterThan(0);
            
            expect(typeof coin.jpy).toBe('number');
            expect(coin.jpy).toBeGreaterThan(0);
        });
    });
});