import { describe, it, expect } from 'vitest';
import { 
  validateCoinListParams, 
  validateCoinPriceParams,
  validateCoinDetailsParams
} from '../../src/middleware/inputValidation';

// Helper function to create mock request and response objects
const createMockReqRes = (query = {}, params = {}) => {
  const req = { query, params };
  const res = {
    status: () => ({
      json: (obj) => obj
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
      expect(result).toHaveProperty('error');
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
      expect(result).toHaveProperty('error');
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin'
      });

      const result = validateCoinDetailsParams(req, res, next);
      expect(result).toBeUndefined();
    });

    it('should reject invalid coin ID', () => {
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin!@#'
      });

      const result = validateCoinDetailsParams(req, res, next);
      expect(result).toHaveProperty('error');
    });
  });
});