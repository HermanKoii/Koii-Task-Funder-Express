import { describe, it, expect } from 'vitest';
import { 
  validateCoinPriceParams, 
  validateCoinListParams, 
  validateCoinDetailsParams 
} from '../../src/middleware/inputValidation.ts';

function createMockReqRes(query = {}, params = {}) {
  return {
    req: { query, params },
    res: {
      status: (code) => ({
        json: (body) => ({ status: code, body })
      }),
      json: (body) => body
    },
    next: () => {}
  };
}

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const { req, res, next } = createMockReqRes({
        ids: 'bitcoin',
        vs_currencies: 'usd'
      });

      const middleware = validateCoinPriceParams()(req, res, next);
      expect(middleware).toBeUndefined(); // Successful validation passes
    });

    it('should reject invalid coin price query params', () => {
      const { req, res, next } = createMockReqRes({
        ids: 'bitcoin!@#',
        vs_currencies: ''
      });

      const middleware = validateCoinPriceParams()(req, res, next);
      expect(middleware).toBeDefined(); // Invalid input returns an error
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const { req, res, next } = createMockReqRes({
        include_platform: 'true'
      });

      const middleware = validateCoinListParams()(req, res, next);
      expect(middleware).toBeUndefined(); // Successful validation passes
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin'
      });

      const middleware = validateCoinDetailsParams()(req, res, next);
      expect(middleware).toBeUndefined(); // Successful validation passes
    });

    it('should reject invalid coin ID', () => {
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin!@#'
      });

      const middleware = validateCoinDetailsParams()(req, res, next);
      expect(middleware).toBeDefined(); // Invalid input returns an error
    });
  });
});