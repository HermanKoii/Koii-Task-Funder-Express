const httpMocks = require('node-mocks-http');
const validateCoinListParams = require('../../src/middleware/coinListValidation');

describe('Coin List Validation Middleware', () => {
  const mockNext = jest.fn();

  beforeEach(() => {
    mockNext.mockClear();
  });

  test('should pass with default parameters', () => {
    const req = httpMocks.createRequest({
      query: {}
    });
    const res = httpMocks.createResponse();

    validateCoinListParams(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
    expect(req.validatedQuery).toEqual({
      page: 1,
      per_page: 100,
      order: 'market_cap_desc',
      sparkline: false
    });
  });

  test('should reject invalid page number', () => {
    const req = httpMocks.createRequest({
      query: { page: -1 }
    });
    const res = httpMocks.createResponse();

    validateCoinListParams(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      status: 400,
      message: 'Invalid page number. Must be a positive integer.'
    }));
  });

  test('should reject invalid per_page', () => {
    const req = httpMocks.createRequest({
      query: { per_page: 300 }
    });
    const res = httpMocks.createResponse();

    validateCoinListParams(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      status: 400,
      message: 'Invalid per_page. Must be between 1 and 250.'
    }));
  });

  test('should reject invalid order', () => {
    const req = httpMocks.createRequest({
      query: { order: 'invalid_order' }
    });
    const res = httpMocks.createResponse();

    validateCoinListParams(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      status: 400,
      message: expect.stringContaining('Invalid order. Must be one of:')
    }));
  });

  test('should reject invalid sparkline', () => {
    const req = httpMocks.createRequest({
      query: { sparkline: 'not_a_boolean' }
    });
    const res = httpMocks.createResponse();

    validateCoinListParams(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.objectContaining({
      status: 400,
      message: 'Sparkline must be a boolean value.'
    }));
  });

  test('should convert string boolean to actual boolean', () => {
    const req = httpMocks.createRequest({
      query: { 
        page: '2', 
        per_page: '50', 
        sparkline: 'true' 
      }
    });
    const res = httpMocks.createResponse();

    validateCoinListParams(req, res, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
    expect(req.validatedQuery).toEqual({
      page: 2,
      per_page: 50,
      order: 'market_cap_desc',
      sparkline: true
    });
  });
});