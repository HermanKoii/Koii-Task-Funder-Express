import { describe, it, expect, vi } from 'vitest';
import { 
  validateCoinPriceParams, 
  validateCoinListParams, 
  validateCoinDetailsParams 
} from '../../src/middleware/inputValidation';

describe('Input Validation Middleware', () => {
  // Coin Price Validation
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const req = { query: { coins: 'bitcoin,ethereum' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinPriceParams(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin price query params', () => {
      const req = { query: { coins: '' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinPriceParams(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  });

  // Coin List Validation
  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const req = { query: { limit: '10', offset: '0' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinListParams(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin list query params', () => {
      const req = { query: { limit: '-1', offset: 'invalid' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinListParams(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  });

  // Coin Details Validation
  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const req = { params: { coinId: 'bitcoin' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinDetailsParams(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should reject invalid coin ID', () => {
      const req = { params: { coinId: '' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      validateCoinDetailsParams(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  });
});