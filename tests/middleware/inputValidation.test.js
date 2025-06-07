import { describe, it, expect, vi } from 'vitest';
import { 
  validateCoinPriceParams, 
  validateCoinListParams, 
  validateCoin 
} from '../../src/middleware/inputValidation';

// Mock Express request, response, and next function
function createMockReqRes(query = {}, params = {}) {
  const req = { query, params };
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };
  const next = vi.fn();
  return { req, res, next };
}

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const { req, res, next } = createMockReqRes({
        id: 'bitcoin',
        vs_currency: 'usd',
        order: 'market_cap_desc'
      });

      validateCoinPriceParams(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', () => {
      const { req, res, next } = createMockReqRes({
        id: 123,
        vs_currency: {}
      });

      validateCoinPriceParams(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
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

    it('should reject invalid coin list query params', () => {
      const { req, res, next } = createMockReqRes({
        order: 123,
        per_page: '-10',
        page: 'abc'
      });

      validateCoinListParams(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { coinId: 'bitcoin' });

      validateCoin(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin ID', () => {
      const { req, res, next } = createMockReqRes({}, { coinId: '' });

      validateCoin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});