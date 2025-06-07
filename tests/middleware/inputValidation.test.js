import { describe, it, expect, vi } from 'vitest';
import { 
  validateCoinListParams, 
  validateCoinPriceParams, 
  validateCoinDetailsParams,
  validateCoin 
} from '../../src/middleware/inputValidation';

// Mock Express request and response
const createMockReqRes = (query = {}, params = {}, body = {}) => {
  const req = { query, params, body };
  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };
  const next = vi.fn();
  return { req, res, next };
};

describe('Input Validation Middleware', () => {
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
        per_page: '300',
        page: '-1'
      });

      validateCoinListParams(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });

      validateCoinPriceParams(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { id: 123 });

      validateCoinPriceParams(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const validator = validateCoinDetailsParams();
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin' });

      validator(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin ID', () => {
      const validator = validateCoinDetailsParams();
      const { req, res, next } = createMockReqRes({}, { id: 'bitcoin!@#' });

      validator(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('Coin Validation', () => {
    it('should validate correct coin body', () => {
      const { req, res, next } = createMockReqRes({}, {}, {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin'
      });

      validateCoin(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin body', () => {
      const { req, res, next } = createMockReqRes({}, {}, {
        id: 'bitcoin'
      });

      validateCoin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });
});