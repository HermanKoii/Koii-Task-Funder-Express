import { describe, it, expect, vi } from 'vitest';
import { 
  validateCoinListParams, 
  validateCoin, 
  validateCoinPriceParams,
  validateCoinDetailsParams 
} from '../../src/middleware/inputValidation.ts';

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const req = { query: { vsCurrency: 'usd', ids: 'bitcoin' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinPriceParams(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', () => {
      const req = { query: {} };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinPriceParams(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const req = { 
        query: { 
          order: 'market_cap_desc', 
          per_page: '100', 
          page: '1' 
        } 
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinListParams(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin list query params', () => {
      const req = { 
        query: { 
          order: 'invalid_order', 
          per_page: '300', 
          page: '-1' 
        } 
      };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinListParams(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const req = { params: { coinId: 'bitcoin' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoin(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin ID', () => {
      const req = { params: { coinId: '' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoin(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
  });
});