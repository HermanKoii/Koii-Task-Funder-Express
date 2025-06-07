const { validateInput } = require('../../src/middleware/inputValidation'); // Adjust path as needed

describe('Input Validation Middleware', () => {
  test('should validate valid input', () => {
    const mockReq = {
      query: {
        ids: 'bitcoin',
        vs_currencies: 'usd'
      }
    };
    const mockRes = {};
    const mockNext = jest.fn();

    validateInput(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  test('should reject invalid input', () => {
    const mockReq = {
      query: {}
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const mockNext = jest.fn();

    validateInput(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
  });
});