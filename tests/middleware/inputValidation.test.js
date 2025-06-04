import { describe, it, expect, vi } from 'vitest';
import { validateCoinPriceParams, validateCoinListParams, validateCoinDetailsParams } from '../../src/middleware/inputValidation.js';

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
    it('should validate correct coin price query params', async () => {
      const validators = validateCoinPriceParams();
      const { req, res, next } = createMockReqRes({
        ids: 'bitcoin',
        vs_currencies: 'usd'
      });

      for (const validator of validators) {
        await validator(req, res, next);
      }

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', async () => {
      const validators = validateCoinPriceParams();
      const { req, res, next } = createMockReqRes({
        ids: 'bitcoin!@#',
        vs_currencies: ''
      });

      for (const validator of validators) {
        await validator(req, res, next);
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', async () => {
      const validators = validateCoinListParams();
      const { req, res, next } = createMockReqRes({
        include_platform: 'true'
      });

      for (const validator of validators) {
        await validator(req, res, next);
      }

      expect(next).toHaveBeenCalled();
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', async () => {
      const validators = validateCoinDetailsParams();
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin'
      });

      for (const validator of validators) {
        await validator(req, res, next);
      }

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin ID', async () => {
      const validators = validateCoinDetailsParams();
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin!@#'
      });

      for (const validator of validators) {
        await validator(req, res, next);
      }

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
  });
});