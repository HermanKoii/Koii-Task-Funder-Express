const { 
    validateCoinPriceParams, 
    validateCoinListParams, 
    validateCoinDetailsParams 
} = require('../../src/middleware/inputValidation');

// Log all steps to debug
const createMockReqRes = (query = {}, params = {}) => {
  const req = { query, params };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  const next = jest.fn(() => {
    console.log('Next called');
  });
  return { req, res, next };
};

describe('Input Validation Middleware', () => {
  describe('Coin Price Validation', () => {
    it('should validate correct coin price query params', () => {
      const validators = validateCoinPriceParams();
      const { req, res, next } = createMockReqRes({
        ids: 'bitcoin',
        vs_currencies: 'usd'
      });

      let currentMiddleware = 0;
      const runMiddleware = () => {
        console.log(`Running middleware ${currentMiddleware}`);
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

  // Other tests remain the same...
});