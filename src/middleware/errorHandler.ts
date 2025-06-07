import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/error';
import { errorResponseUtil } from '../utils/error-response';

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
  // Determine the appropriate status code and error details
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const errorMessage = err instanceof ApiError ? err.message : 'An unexpected error occurred';

  // Use the centralized error response utility
  errorResponseUtil.sendErrorResponse(
    res, 
    statusCode, 
    errorMessage, 
    process.env.NODE_ENV === 'development' ? { stack: err.stack } : undefined
  );
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