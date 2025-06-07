import { describe, it, expect } from 'vitest';
import { 
  validateCoinListParams, 
  validateCoinPriceParams, 
  validateCoinDetailsParams,
  validateCoin 
} from '../../src/middleware/inputValidation';

// Mock Express request and response
const createMockReqRes = (query = {}, params = {}) => {
  const req = { query, params };
  const res = {
    status: (code) => ({
      json: (body) => ({ statusCode: code, body })
    })
  };
  const next = () => {};
  return { req, res, next };
};

describe('Input Validation Middleware', () => {
  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const { req, res, next } = createMockReqRes({
        order: 'market_cap_desc',
        per_page: '10',
        page: '1'
      });
      
      const result = validateCoinListParams(req, res, next);
      expect(result).toBeUndefined();
    });

    it('should reject invalid order parameter', () => {
      const { req, res, next } = createMockReqRes({
        order: 'invalid_order'
      });
      
      const result = validateCoinListParams(req, res, next);
      expect(result).toBeDefined();
      expect(result.statusCode).toBe(400);
    });
  });

  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      
      const result = validateCoinPriceParams(req, res, next);
      expect(result).toBeUndefined();
    });

    it('should reject invalid coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, {});
      
      const result = validateCoinPriceParams(req, res, next);
      expect(result).toBeDefined();
      expect(result.statusCode).toBe(400);
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      
      const result = validateCoinDetailsParams(req, res, next);
      expect(result).toBeUndefined();
    });

    it('should reject invalid coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin!@#' });
      
      const result = validateCoinDetailsParams(req, res, next);
      expect(result).toBeDefined();
      expect(result.statusCode).toBe(400);
    });
  });

  describe('Coin Validation', () => {
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

    it('should validate a correct coin object', () => {
      expect(validateCoin(validCoin)).toBe(true);
    });

    it('should reject a coin object missing required fields', () => {
      const invalidCoin = { ...validCoin };
      delete invalidCoin.market_cap_rank;
      expect(validateCoin(invalidCoin)).toBe(false);
    });
  });
});