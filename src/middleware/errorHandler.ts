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
  // Determine appropriate status code and error details
  const statusCode = err instanceof ApiError 
    ? err.statusCode 
    : HttpErrorCode.INTERNAL_SERVER_ERROR;

  // Prepare error details for logging and response
  const errorDetails = process.env.NODE_ENV === 'development' 
    ? { stack: err.stack } 
    : undefined;

  // Use centralized error response utility
  return errorResponseUtil.sendErrorResponse(
    res, 
    statusCode, 
    err.message || 'An unexpected error occurred', 
    errorDetails
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