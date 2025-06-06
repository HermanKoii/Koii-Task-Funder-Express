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
  // Default error status and message
  let statusCode = HttpErrorCode.INTERNAL_SERVER_ERROR;
  let errorMessage = 'An unexpected error occurred';

  // Check if it's an ApiError with a specific status code
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }

  // Log the error for server-side tracking
  console.error(err);

  // Send standardized error response
  return errorResponseUtil.sendErrorResponse(
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