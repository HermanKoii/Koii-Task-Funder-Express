const inputValidation = require('../../src/middleware/inputValidation');

describe('Input Validation Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {},
      query: {},
      params: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  it('should pass through valid input', () => {
    mockReq.body = { taskId: 'valid-task-id', amount: 100 };
    
    inputValidation(mockReq, mockRes, mockNext);
    
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('should reject invalid input', () => {
    mockReq.body = { taskId: '', amount: -1 };
    
    inputValidation(mockReq, mockRes, mockNext);
    
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String)
      })
    );
    expect(mockNext).not.toHaveBeenCalled();
  });
});