import { describe, it, expect } from 'vitest';
import { 
  validateCoinPriceParams, 
  validateCoinListParams, 
  validateCoinDetailsParams 
} from '../../src/middleware/inputValidation';

function createMockReqRes(query = {}, params = {}) {
  const jsonResponse = {
    json: (body) => body,
    status: () => ({ json: (body) => body })
  };
  
  return {
    req: { query, params },
    res: jsonResponse,
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

      const middleware = validateCoinPriceParams();
      const result = middleware(req, res, next);
      expect(result).toBeUndefined(); // Successful validation passes
    });

    it('should reject invalid coin price query params', () => {
      const { req, res, next } = createMockReqRes({
        ids: 'dogecoin',
        vs_currencies: ''
      });

      const middleware = validateCoinPriceParams();
      const result = middleware(req, res, next);
      expect(result).toHaveProperty('error'); // Invalid input returns an error
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const { req, res, next } = createMockReqRes({
        include_platform: 'true'
      });

      const middleware = validateCoinListParams();
      const result = middleware(req, res, next);
      expect(result).toBeUndefined(); // Successful validation passes
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin'
      });

      const middleware = validateCoinDetailsParams();
      const result = middleware(req, res, next);
      expect(result).toBeUndefined(); // Successful validation passes
    });

    it('should reject invalid coin ID', () => {
      const { req, res, next } = createMockReqRes({}, {
        id: 'dogecoin'
      });

      const middleware = validateCoinDetailsParams();
      const result = middleware(req, res, next);
      expect(result).toHaveProperty('error'); // Invalid input returns an error
    });
  });
});