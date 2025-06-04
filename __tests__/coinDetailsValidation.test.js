const { validateCoinDetails } = require('../src/middleware/coinDetailsValidation');

describe('Coin Details Validation Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { params: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  const testCases = [
    // Valid inputs
    { input: 'bitcoin', expectValid: true },
    { input: 'ethereum', expectValid: true },
    { input: 'cardano', expectValid: true },
    { input: 'polkadot', expectValid: true },
    
    // Invalid inputs
    { input: '', expectValid: false },
    { input: 'BITCOIN', expectValid: false },
    { input: 'bitcoin!@#', expectValid: false },
    { input: 'a'.repeat(51), expectValid: false }
  ];

  testCases.forEach(({ input, expectValid }) => {
    it(`should ${expectValid ? 'allow' : 'reject'} coin ID: ${input}`, () => {
      mockReq.params.coinId = input;
      
      validateCoinDetails(mockReq, mockRes, mockNext);

      if (expectValid) {
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
      } else {
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
          status: 'error',
          code: 'INVALID_COIN_ID'
        }));
        expect(mockNext).not.toHaveBeenCalled();
      }
    });
  });
});