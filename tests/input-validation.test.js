import { describe, it, expect, vi } from 'vitest';
import { validateInput, validationSchemas } from '../src/middleware/input-validation.js';

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should pass validation with valid inputs', () => {
      const req = { query: { ids: 'bitcoin', vs_currencies: 'usd' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const middleware = validateInput(validationSchemas.coinPriceSchema);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should fail validation without required parameters', () => {
      const req = { query: {} };
      const res = { 
        status: vi.fn().mockReturnThis(), 
        json: vi.fn() 
      };
      const next = vi.fn();

      const middleware = validateInput(validationSchemas.coinPriceSchema);
      middleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });

  describe('Coin List Validation', () => {
    it('should pass validation with optional parameter', () => {
      const req = { query: { include_platform: 'true' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const middleware = validateInput(validationSchemas.coinListSchema);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('Coin Details Validation', () => {
    it('should pass validation with required parameter', () => {
      const req = { query: { id: 'bitcoin' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const middleware = validateInput(validationSchemas.coinDetailsSchema);
      middleware(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should fail validation without required id', () => {
      const req = { query: {} };
      const res = { 
        status: vi.fn().mockReturnThis(), 
        json: vi.fn() 
      };
      const next = vi.fn();

      const middleware = validateInput(validationSchemas.coinDetailsSchema);
      middleware(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(400);
    });
  });
});