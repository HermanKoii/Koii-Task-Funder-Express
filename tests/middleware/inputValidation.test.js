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
    status: () => ({
      json: () => {}
    })
  };
  const next = () => {};
  return { req, res, next };
};

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      const spy = res.status = vi.fn().mockReturnValue({ json: vi.fn() });
      
      validateCoinPriceParams(req, res, next);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, {});
      const spy = res.status = vi.fn().mockReturnValue({ json: vi.fn() });
      
      validateCoinPriceParams(req, res, next);
      expect(spy).toHaveBeenCalledWith(400);
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const { req, res, next } = createMockReqRes({ 
        order: 'market_cap_desc', 
        per_page: '10', 
        page: '1' 
      });
      const spy = res.status = vi.fn().mockReturnValue({ json: vi.fn() });
      
      validateCoinListParams(req, res, next);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should reject invalid order', () => {
      const { req, res, next } = createMockReqRes({ order: 'invalid_order' });
      const spy = res.status = vi.fn().mockReturnValue({ json: vi.fn() });
      
      validateCoinListParams(req, res, next);
      expect(spy).toHaveBeenCalledWith(400);
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });
      const spy = res.status = vi.fn().mockReturnValue({ json: vi.fn() });
      
      validateCoinDetailsParams(req, res, next);
      expect(spy).not.toHaveBeenCalled();
    });

    it('should reject invalid coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin!@#' });
      const spy = res.status = vi.fn().mockReturnValue({ json: vi.fn() });
      
      validateCoinDetailsParams(req, res, next);
      expect(spy).toHaveBeenCalledWith(400);
    });
  });

  describe('Coin Validation', () => {
    it('should validate coin with all required properties', () => {
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

    it('should reject coin with missing properties', () => {
      const invalidCoin = {
        id: 'bitcoin',
        symbol: 'btc'
      };
      
      expect(validateCoin(invalidCoin)).toBe(false);
    });
  });
});