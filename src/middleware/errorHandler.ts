import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/error';
import { errorResponseUtil, HttpErrorCode } from '../utils/error-response';

/**
 * Global error handling middleware
 * Handles different types of errors and sends appropriate response
 */
export const errorHandler = (
  err: Error | ApiError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  // Determine appropriate status code and message
  const statusCode = err instanceof ApiError 
    ? err.statusCode 
    : HttpErrorCode.INTERNAL_SERVER_ERROR;

  const message = err instanceof ApiError 
    ? err.message 
    : 'An unexpected error occurred';

  // Create standardized error response
  const errorResponse = {
    status: 'error',
    message: message
  };

  // Send error response
  return res.status(statusCode).json(errorResponse);
};

/**
 * Utility function to wrap async route handlers
 * Catches any async errors and passes them to global error handler
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};