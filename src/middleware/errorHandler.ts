import { Request, Response, NextFunction } from 'express';

/**
 * Custom error class for standardized API errors
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    statusCode: number, 
    message: string, 
    isOperational: boolean = true, 
    stack: string = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Centralized error handling middleware
 * Standardizes error responses across the API
 */
export const errorHandler = (
  err: Error | ApiError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';
  let errorDetails: any = {};

  // If it's an ApiError, use its properties
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }

  // Always use a generic error message for non-ApiErrors to prevent leaking implementation details
  if (!(err instanceof ApiError)) {
    errorMessage = 'Internal Server Error';
  }

  // Determine additional error details based on error type
  if (err instanceof Error) {
    errorDetails = {
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };
  }

  // Log the error (in a real app, use a proper logging mechanism)
  console.error(err);

  // Send standardized error response
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage,
    ...errorDetails
  });
};

/**
 * Utility function to create operational errors
 */
export const createError = (
  statusCode: number, 
  message: string, 
  isOperational: boolean = true
): ApiError => {
  return new ApiError(statusCode, message, isOperational);
};