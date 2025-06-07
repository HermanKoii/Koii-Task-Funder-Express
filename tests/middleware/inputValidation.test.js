import { describe, it, expect, vi } from 'vitest';
import { 
  validateCoinListParams, 
  validateCoinPriceParams, 
  validateCoinDetailsParams,
  validateCoin 
} from '../../src/middleware/inputValidation';

// Helper function to create mock request and response
const createMockReqRes = (query = {}, params = {}) => {
  const req = { query, params };
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };
  const next = vi.fn();
  return { req, res, next };
};

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      validateCoinPriceParams(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { id: '' });
      validateCoinPriceParams(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Coin ID is required' });
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const { req, res, next } = createMockReqRes({ 
        order: 'market_cap_desc', 
        per_page: '50', 
        page: '1' 
      });
      validateCoinListParams(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid order parameter', () => {
      const { req, res, next } = createMockReqRes({ order: 'invalid_order' });
      validateCoinListParams(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      validateCoinDetailsParams(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin!@#' });
      validateCoinDetailsParams(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid coin ID format' });
    });
  });

  describe('Coin Validation', () => {
    it('should validate coin object with all required properties', () => {
      const validCoin = {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        current_price: 50000,
        market_cap: 1000000000000,
        total_volume: 50000000000,
        market_cap_rank: 1,
        price_change_percentage_24h: 2.5
      };
      expect(validateCoin(validCoin)).toBe(true);
    });

    it('should fail validation for incomplete coin object', () => {
      const invalidCoin = {
        id: 'bitcoin',
        symbol: 'btc'
      };
      expect(validateCoin(invalidCoin)).toBe(false);
    });
  });
});