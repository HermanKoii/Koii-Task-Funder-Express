import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../src/middleware/errorHandler';
import { ApiError } from '../src/types/error';
import { errorResponseUtil } from '../src/utils/error-response';

describe('Error Handler Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  it('should handle ApiError with correct status and message', () => {
    const apiError = new ApiError('Test API Error', 400);
    
    errorHandler(
      apiError, 
      mockReq as Request, 
      mockRes as Response, 
      mockNext
    );

    expect(errorResponseUtil.sendErrorResponse).toHaveBeenCalledWith(
      mockRes,
      400,
      'Test API Error',
      undefined
    );
  });

  it('should handle generic Error with default 500 status', () => {
    const genericError = new Error('Unexpected error');
    
    errorHandler(
      genericError, 
      mockReq as Request, 
      mockRes as Response, 
      mockNext
    );

    expect(errorResponseUtil.sendErrorResponse).toHaveBeenCalledWith(
      mockRes,
      500,
      'An unexpected error occurred',
      undefined
    );
  });
});