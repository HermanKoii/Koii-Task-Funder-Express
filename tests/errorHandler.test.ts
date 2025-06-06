import { describe, it, expect } from 'vitest';
import { ApiError, createError, errorHandler } from '../src/middleware/errorHandler';
import { Request, Response } from 'express';

describe('Error Handling Middleware', () => {
  // Test ApiError creation
  it('should create an ApiError with correct properties', () => {
    const error = new ApiError(400, 'Test Error', true);
    
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('Test Error');
    expect(error.isOperational).toBe(true);
  });

  // Test convenient error creation methods
  it('should create different types of errors with correct status codes', () => {
    const badRequest = createError.badRequest();
    const unauthorized = createError.unauthorized();
    const forbidden = createError.forbidden();
    const notFound = createError.notFound();
    const conflict = createError.conflict();
    const internalServer = createError.internalServer();

    expect(badRequest.statusCode).toBe(400);
    expect(unauthorized.statusCode).toBe(401);
    expect(forbidden.statusCode).toBe(403);
    expect(notFound.statusCode).toBe(404);
    expect(conflict.statusCode).toBe(409);
    expect(internalServer.statusCode).toBe(500);
  });

  // Test error handler middleware
  it('should return correct error response for ApiError', () => {
    const mockError = new ApiError(400, 'Test Bad Request');
    const mockReq = {} as Request;
    const mockRes = {
      status: (code: number) => ({
        json: (data: any) => {
          expect(code).toBe(400);
          expect(data).toEqual({
            success: false,
            status: 400,
            message: 'Test Bad Request'
          });
        }
      })
    } as unknown as Response;
    const mockNext = () => {};

    // Set development environment to test stack trace
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    errorHandler(mockError, mockReq, mockRes, mockNext);

    // Restore original environment
    process.env.NODE_ENV = originalEnv;
  });

  // Test generic error handling
  it('should handle generic errors with 500 status', () => {
    const genericError = new Error('Generic Error');
    const mockReq = {} as Request;
    const mockRes = {
      status: (code: number) => ({
        json: (data: any) => {
          expect(code).toBe(500);
          expect(data).toEqual({
            success: false,
            status: 500,
            message: 'Generic Error'
          });
        }
      })
    } as unknown as Response;
    const mockNext = () => {};

    errorHandler(genericError, mockReq, mockRes, mockNext);
  });
});