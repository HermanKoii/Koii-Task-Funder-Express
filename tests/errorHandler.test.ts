import { describe, it, expect } from '@jest/globals';
import { Response } from 'express';
import { errorHandler } from '../src/middleware/errorHandler';
import { ApiError } from '../src/types/error';
import { HttpErrorCode } from '../src/utils/error-response';

// Create a mock response object
function mockResponse(): Partial<Response> {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
}

describe('Error Handler Middleware', () => {
  it('should handle generic errors', () => {
    const mockRes = mockResponse() as Response;
    const mockNext = jest.fn();
    const genericError = new Error('Generic error');

    errorHandler(genericError, {} as any, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(HttpErrorCode.INTERNAL_SERVER_ERROR);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      success: false,
      error: expect.objectContaining({
        message: 'An unexpected error occurred',
        code: HttpErrorCode.INTERNAL_SERVER_ERROR
      })
    }));
  });

  it('should handle ApiError with correct status and message', () => {
    const mockRes = mockResponse() as Response;
    const mockNext = jest.fn();
    const apiError = new ApiError('Custom API error', 400);

    errorHandler(apiError, {} as any, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      success: false,
      error: expect.objectContaining({
        message: 'Custom API error',
        code: 400
      })
    }));
  });
});