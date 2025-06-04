import { describe, it, expect, beforeEach, jest } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import { ApiError, errorHandler, createError } from '../src/middleware/errorHandler';

describe('Error Handling Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
  });

  describe('ApiError', () => {
    it('should create an ApiError with correct properties', () => {
      const apiError = new ApiError(404, 'Not Found', true);
      
      expect(apiError).toBeInstanceOf(Error);
      expect(apiError.statusCode).toBe(404);
      expect(apiError.message).toBe('Not Found');
      expect(apiError.isOperational).toBe(true);
    });
  });

  describe('errorHandler', () => {
    it('should handle standard Error', () => {
      const standardError = new Error('Test Error');
      
      errorHandler(
        standardError, 
        mockRequest as Request, 
        mockResponse as Response, 
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          status: 500,
          message: 'Internal Server Error'
        })
      );
    });

    it('should handle ApiError', () => {
      const apiError = new ApiError(400, 'Bad Request', true);
      
      errorHandler(
        apiError, 
        mockRequest as Request, 
        mockResponse as Response, 
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          status: 400,
          message: 'Bad Request'
        })
      );
    });
  });

  describe('createError', () => {
    it('should create an ApiError', () => {
      const error = createError(403, 'Forbidden');
      
      expect(error).toBeInstanceOf(ApiError);
      expect(error.statusCode).toBe(403);
      expect(error.message).toBe('Forbidden');
      expect(error.isOperational).toBe(true);
    });
  });
});