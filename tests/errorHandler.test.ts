import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../src/middleware/errorHandler';
import { ApiError } from '../src/types/error';

describe('Error Handler Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockNextFunction = jest.fn();
  });

  it('should handle standard Error correctly', () => {
    const testError = new Error('Standard Error');

    errorHandler(
      testError, 
      mockRequest as Request, 
      mockResponse as Response, 
      mockNextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'An unexpected error occurred'
    });
  });

  it('should handle ApiError with specific status code', () => {
    const testApiError = new ApiError('API Error', 400);

    errorHandler(
      testApiError, 
      mockRequest as Request, 
      mockResponse as Response, 
      mockNextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: 'error',
      message: 'API Error'
    });
  });
});