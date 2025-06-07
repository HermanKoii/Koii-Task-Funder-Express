import { describe, it, expect, vi } from 'vitest';
import { validateCoinPriceParams, validateCoinListParams, validateCoinDetailsParams } from '../../src/middleware/inputValidation';

// Mock Express request and response
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
      const { req, res, next } = createMockReqRes({}, { coinId: 'bitcoin' });

      validateCoinPriceParams(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', () => {
      const { req, res, next } = createMockReqRes({}, { coinId: 'bitcoin!@#' });

      validateCoinPriceParams(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const { req, res, next } = createMockReqRes({ limit: '10', offset: '0' });

      validateCoinListParams(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin list query params', () => {
      const { req, res, next } = createMockReqRes({ limit: 'invalid', offset: 'abc' });

      validateCoinListParams(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
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
      expect(res.json).toHaveBeenCalled();
    });
  });
});