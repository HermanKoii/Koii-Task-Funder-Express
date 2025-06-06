const { describe, it, expect } = require('@jest/globals');
const { 
  validateCoinPriceParams, 
  validateCoinListParams, 
  validateCoinDetailsParams 
} = require('../../src/middleware/inputValidation');

describe('Input Validation Middleware', () => {
  describe('validateCoinPriceParams', () => {
    it('should validate coin price parameters', () => {
      const validReq = {
        query: { ids: 'bitcoin', vs_currencies: 'usd' }
      };
      const validRes = {};
      const validNext = jest.fn();

      validateCoinPriceParams(validReq, validRes, validNext);
      expect(validNext).toHaveBeenCalled();
    });

    it('should reject invalid coin price parameters', () => {
      const invalidReq = {
        query: {}
      };
      const invalidRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const invalidNext = jest.fn();

      validateCoinPriceParams(invalidReq, invalidRes, invalidNext);
      expect(invalidRes.status).toHaveBeenCalledWith(400);
      expect(invalidNext).not.toHaveBeenCalled();
    });
  });
});