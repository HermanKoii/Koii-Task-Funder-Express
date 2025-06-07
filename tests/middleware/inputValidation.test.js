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
  const next = jest.fn();
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

      const runMiddleware = (index) => {
        if (index < validators.length) {
          validators[index](req, res, () => {
            runMiddleware(index + 1);
          });
        } else {
          expect(next).toHaveBeenCalled();
        }
      };

      runMiddleware(0);
    });

    it('should reject invalid coin price query params', () => {
      const validators = validateCoinPriceParams();
      const { req, res, next } = createMockReqRes({
        ids: 'bitcoin!@#',
        vs_currencies: ''
      });

      const runMiddleware = (index) => {
        if (index < validators.length) {
          validators[index](req, res, () => {
            runMiddleware(index + 1);
          });
        }
      };

      runMiddleware(0);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe('Coin List Validation', () => {
    it('should validate correct coin list query params', () => {
      const validators = validateCoinListParams();
      const { req, res, next } = createMockReqRes({
        include_platform: 'true'
      });

      const runMiddleware = (index) => {
        if (index < validators.length) {
          validators[index](req, res, () => {
            runMiddleware(index + 1);
          });
        } else {
          expect(next).toHaveBeenCalled();
        }
      };

      runMiddleware(0);
    });
  });

  describe('Coin Details Validation', () => {
    it('should validate correct coin ID', () => {
      const validators = validateCoinDetailsParams();
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin'
      });

      const runMiddleware = (index) => {
        if (index < validators.length) {
          validators[index](req, res, () => {
            runMiddleware(index + 1);
          });
        } else {
          expect(next).toHaveBeenCalled();
        }
      };

      runMiddleware(0);
    });

    it('should reject invalid coin ID', () => {
      const validators = validateCoinDetailsParams();
      const { req, res, next } = createMockReqRes({}, {
        id: 'bitcoin!@#'
      });

      const runMiddleware = (index) => {
        if (index < validators.length) {
          validators[index](req, res, () => {
            runMiddleware(index + 1);
          });
        }
      };

      runMiddleware(0);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
    });
  });
});