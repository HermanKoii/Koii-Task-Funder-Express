import { describe, it, expect, beforeEach, jest } from 'vitest';
import { validateCoinList, validateCoinPrices, validateCoinDetails } from '../src/middleware/inputValidation';
import { validationResult } from 'express-validator';

describe('Input Validation Middleware', () => {
  const mockReq = (query = {}, params = {}) => ({
    query,
    params
  });

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };

  const mockNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Coin List Validation', () => {
    it('should pass with valid optional parameters', async () => {
      const req = mockReq({ page: '1', per_page: '100', order: 'market_cap_desc' });
      const validations = validateCoinList();
      
      for (let validation of validations.slice(0, -1)) {
        await validation(req, mockRes, mockNext);
      }

      const result = validationResult(req);
      expect(result.isEmpty()).toBe(true);
    });

    it('should reject invalid page parameter', async () => {
      const req = mockReq({ page: '-1' });
      const validations = validateCoinList();
      
      for (let validation of validations.slice(0, -1)) {
        await validation(req, mockRes, mockNext);
      }

      const result = validationResult(req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toContain('Page must be a positive integer');
    });

    it('should reject invalid order parameter', async () => {
      const req = mockReq({ order: 'invalid_order' });
      const validations = validateCoinList();
      
      for (let validation of validations.slice(0, -1)) {
        await validation(req, mockRes, mockNext);
      }

      const result = validationResult(req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toContain('Invalid order parameter');
    });
  });

  describe('Coin Prices Validation', () => {
    it('should pass with valid parameters', async () => {
      const req = mockReq({ ids: 'bitcoin', vs_currencies: 'usd' });
      const validations = validateCoinPrices();
      
      for (let validation of validations.slice(0, -1)) {
        await validation(req, mockRes, mockNext);
      }

      const result = validationResult(req);
      expect(result.isEmpty()).toBe(true);
    });

    it('should reject missing ids', async () => {
      const req = mockReq({ vs_currencies: 'usd' });
      const validations = validateCoinPrices();
      
      for (let validation of validations.slice(0, -1)) {
        await validation(req, mockRes, mockNext);
      }

      const result = validationResult(req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toContain('Coin IDs are required');
    });
  });

  describe('Coin Details Validation', () => {
    it('should pass with valid coin ID', async () => {
      const req = mockReq({}, { id: 'bitcoin' });
      const validations = validateCoinDetails();
      
      for (let validation of validations.slice(0, -1)) {
        await validation(req, mockRes, mockNext);
      }

      const result = validationResult(req);
      expect(result.isEmpty()).toBe(true);
    });

    it('should reject empty coin ID', async () => {
      const req = mockReq({}, { id: '' });
      const validations = validateCoinDetails();
      
      for (let validation of validations.slice(0, -1)) {
        await validation(req, mockRes, mockNext);
      }

      const result = validationResult(req);
      expect(result.isEmpty()).toBe(false);
      expect(result.array()[0].msg).toContain('Coin ID is required');
    });
  });
});