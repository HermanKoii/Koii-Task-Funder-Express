import { describe, it, expect } from 'vitest';
import cryptoDetails from '../src/data/cryptocurrencyDetails.json';

describe('Cryptocurrency Details Mock Data', () => {
    const requiredFields = [
        'id', 
        'symbol', 
        'name', 
        'description', 
        'market_data', 
        'links', 
        'image'
    ];

    const supportedCoins = ['bitcoin', 'ethereum'];

    it('should have valid cryptocurrency entries', () => {
        supportedCoins.forEach(coinId => {
            const coin = cryptoDetails[coinId];
            
            // Check that coin exists
            expect(coin).toBeDefined();

            // Check all required fields
            requiredFields.forEach(field => {
                expect(coin).toHaveProperty(field);
            });

            // Market data specific checks
            expect(coin.market_data).toHaveProperty('current_price');
            expect(coin.market_data).toHaveProperty('market_cap');
            expect(coin.market_data).toHaveProperty('total_volume');

            // Image checks
            ['thumb', 'small', 'large'].forEach(imageSize => {
                expect(coin.image).toHaveProperty(imageSize);
                expect(typeof coin.image[imageSize]).toBe('string');
            });
        });
    });

    it('should have valid market data currencies', () => {
        supportedCoins.forEach(coinId => {
            const coin = cryptoDetails[coinId];
            const currencies = ['usd', 'eur', 'jpy'];

            currencies.forEach(currency => {
                expect(coin.market_data.current_price).toHaveProperty(currency);
                expect(coin.market_data.market_cap).toHaveProperty(currency);
                expect(coin.market_data.total_volume).toHaveProperty(currency);
            });
        });
    });
});