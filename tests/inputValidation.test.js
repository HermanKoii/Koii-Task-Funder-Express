import { describe, it, expect } from 'vitest';
import { validateInput, validationHelpers } from '../src/middleware/inputValidation.js';

describe('Input Validation Middleware', () => {
  // Test validation helpers
  describe('Validation Helpers', () => {
    it('should validate coin ID correctly', () => {
      expect(validationHelpers.isValidCoinId('bitcoin')).toBe(true);
      expect(validationHelpers.isValidCoinId('ethereum-token')).toBe(true);
      expect(validationHelpers.isValidCoinId('invalid coin!')).toBe(false);
    });

    it('should validate currency correctly', () => {
      expect(validationHelpers.isValidCurrency('USD')).toBe(true);
      expect(validationHelpers.isValidCurrency('EUR')).toBe(true);
      expect(validationHelpers.isValidCurrency('INVALID')).toBe(false);
    });

    it('should sanitize input string', () => {
      const dirtyInput = '<script>alert("XSS");</script>';
      const sanitizedInput = validationHelpers.sanitizeString(dirtyInput);
      expect(sanitizedInput).not.toContain('<script>');
    });

    it('should validate boolean values', () => {
      expect(validationHelpers.isBoolean(true)).toBe(true);
      expect(validationHelpers.isBoolean(false)).toBe(true);
      expect(validationHelpers.isBoolean('true')).toBe(true);
      expect(validationHelpers.isBoolean('false')).toBe(true);
      expect(validationHelpers.isBoolean('invalid')).toBe(false);
    });
  });

  // Test middleware validation logic
  describe('Middleware Validation', () => {
    const mockNext = () => {};
    const createMockReqRes = (query = {}, body = {}) => ({
      query,
      body,
      status: () => ({
        json: (data) => data
      })
    });

    it('should pass valid input', () => {
      const validationRules = {
        query: {
          id: {
            required: true,
            validate: validationHelpers.isValidCoinId
          },
          currency: {
            required: true,
            validate: validationHelpers.isValidCurrency
          }
        }
      };

      const req = createMockReqRes({
        id: 'bitcoin',
        currency: 'USD'
      });
      const res = req.res;

      const middleware = validateInput(validationRules);
      const result = middleware(req, res, mockNext);
      
      expect(result).toBeUndefined();
    });

    it('should reject invalid input', () => {
      const validationRules = {
        query: {
          id: {
            required: true,
            validate: validationHelpers.isValidCoinId
          }
        }
      };

      const req = createMockReqRes({
        id: 'invalid coin!'
      });
      const res = {
        status: (code) => ({
          json: (data) => {
            expect(code).toBe(400);
            expect(data.error).toBe('Validation Failed');
            expect(data.details).toContain('Invalid value for query parameter \'id\'');
          }
        })
      };

      const middleware = validateInput(validationRules);
      middleware(req, res, mockNext);
    });

    it('should require parameters', () => {
      const validationRules = {
        query: {
          id: {
            required: true
          }
        }
      };

      const req = createMockReqRes({});
      const res = {
        status: (code) => ({
          json: (data) => {
            expect(code).toBe(400);
            expect(data.error).toBe('Validation Failed');
            expect(data.details).toContain('Query parameter \'id\' is required');
          }
        })
      };

      const middleware = validateInput(validationRules);
      middleware(req, res, mockNext);
    });
  });
});