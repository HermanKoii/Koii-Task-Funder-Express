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
      const { req, res, next } = createMockReqRes({
        ids: 'bitcoin',
        vs_currencies: 'usd'
      });

      validateCoinPriceParams[0](req, res, () => {
        validateCoinPriceParams[1](req, res, next);
      });

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', async () => {
      const { req, res, next } = createMockReqRes({
        ids: 'bitcoin!@#',
        vs_currencies: ''
      });

      await validateCoinPriceParams[0](req, res, () => {
        validateCoinPriceParams[1](req, res, next);
      });

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const { req, res, next } = createMockReqRes({
        include_platform: 'true'
      });

      validateCoinListParams[0](req, res, () => {
        validateCoinListParams[1](req, res, next);
      });

      expect(next).toHaveBeenCalled();
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin'
      });

      validateCoinDetailsParams[0](req, res, () => {
        validateCoinDetailsParams[1](req, res, next);
      });

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin ID', async () => {
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin!@#'
      });

      await validateCoinDetailsParams[0](req, res, () => {
        validateCoinDetailsParams[1](req, res, next);
      });

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
  });
});