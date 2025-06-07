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

      const validators = [validateCoinPriceParams];
      let currentMiddleware = 0;

      const runMiddleware = () => {
        if (currentMiddleware < validators.length) {
          validators[currentMiddleware](req, res, () => {
            currentMiddleware++;
            runMiddleware();
          });
        } else {
          expect(next).toHaveBeenCalled();
        }
      };

      runMiddleware();
    });

    it('should reject invalid coin price query params', () => {
      const req = { query: { coins: '' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const validators = [validateCoinPriceParams];
      let currentMiddleware = 0;

      const runMiddleware = () => {
        if (currentMiddleware < validators.length) {
          validators[currentMiddleware](req, res, () => {
            currentMiddleware++;
            runMiddleware();
          });
        } else {
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalled();
        }
      };

      runMiddleware();
    });
  });

  // Coin List Validation
  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const req = { query: { limit: '10', offset: '0' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const validators = [validateCoinListParams];
      let currentMiddleware = 0;

      const runMiddleware = () => {
        if (currentMiddleware < validators.length) {
          validators[currentMiddleware](req, res, () => {
            currentMiddleware++;
            runMiddleware();
          });
        } else {
          expect(next).toHaveBeenCalled();
        }
      };

      runMiddleware();
    });
  });

  // Coin Details Validation
  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const req = { params: { coinId: 'bitcoin' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const validators = [validateCoinDetailsParams];
      let currentMiddleware = 0;

      const runMiddleware = () => {
        if (currentMiddleware < validators.length) {
          validators[currentMiddleware](req, res, () => {
            currentMiddleware++;
            runMiddleware();
          });
        } else {
          expect(next).toHaveBeenCalled();
        }
      };

      runMiddleware();
    });

    it('should reject invalid coin ID', () => {
      const req = { params: { coinId: '' } };
      const res = { status: vi.fn().mockReturnThis(), json: vi.fn() };
      const next = vi.fn();

      const validators = [validateCoinDetailsParams];
      let currentMiddleware = 0;

      const runMiddleware = () => {
        if (currentMiddleware < validators.length) {
          validators[currentMiddleware](req, res, () => {
            currentMiddleware++;
            runMiddleware();
          });
        } else {
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalled();
        }
      };

      runMiddleware();
    });
  });
});