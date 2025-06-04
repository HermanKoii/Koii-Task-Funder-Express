import { describe, it, expect, vi } from 'vitest';
import { validateCoinPriceParams, validateCoinListParams, validateCoin } from '../../src/middleware/inputValidation';

// Mock Express request and response
const createMockReq = (query = {}) => ({ query });
const createMockRes = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn()
});
const createMockNext = vi.fn();

describe('Input Validation Middleware', () => {
  describe('validateCoinPriceParams', () => {
    it('should call next when ids and vs_currencies are present', () => {
      const req = createMockReq({ ids: 'bitcoin', vs_currencies: 'usd' });
      const res = createMockRes();
      const next = createMockNext;

      validateCoinPriceParams(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should return 400 when ids are missing', () => {
      const req = createMockReq({ vs_currencies: 'usd' });
      const res = createMockRes();
      const next = createMockNext;

      validateCoinPriceParams(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Coin ids are required' });
    });

    it('should return 400 when vs_currencies are missing', () => {
      const req = createMockReq({ ids: 'bitcoin' });
      const res = createMockRes();
      const next = createMockNext;

      validateCoinPriceParams(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'Versus currencies are required' });
    });
  });

  describe('validateCoin', () => {
    it('should return true for valid coins', () => {
      expect(validateCoin('bitcoin')).toBe(true);
      expect(validateCoin('ethereum')).toBe(true);
    });

    it('should return false for invalid coins', () => {
      expect(validateCoin('dogecoin')).toBe(false);
      expect(validateCoin('')).toBe(false);
    });
  });
});