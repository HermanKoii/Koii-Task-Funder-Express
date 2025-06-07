const { 
    validateCoinPriceParams, 
    validateCoinListParams, 
    validateCoinDetailsParams 
} = require('../../src/middleware/inputValidation');

// Detailed mock for middleware testing
const createMockReqRes = (query = {}, params = {}) => {
  const req = { query, params };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const next = jest.fn(() => {
    console.log('Next function was called');
  });
  return { req, res, next };
};

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const validators = validateCoinPriceParams();
      console.log('Number of validators:', validators.length);
      const { req, res, next } = createMockReqRes({
        ids: 'bitcoin',
        vs_currencies: 'usd'
      });

      const runMiddleware = (index) => {
        console.log(`Running middleware ${index}`);
        if (index < validators.length) {
          validators[index](req, res, () => {
            console.log(`Middleware ${index} called next`);
            runMiddleware(index + 1);
          });
        } else {
          console.log('All middlewares completed');
          expect(next).toHaveBeenCalled();
        }
      };

      runMiddleware(0);
    });
  });

  // Other tests remain the same...
});