import { Request, Response, NextFunction } from 'express';

// Custom error class for API errors
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true, stack = '') {
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

// Standardized error response interface
interface ErrorResponse {
  success: boolean;
  status: number;
  message: string;
  ...(stack?: string);
}

// Centralized error handling middleware
export const errorHandler = (
  err: Error | ApiError, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  let statusCode = 500;
  let errorMessage = 'Internal Server Error';
  let stack;

  // Check if it's an instance of ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  } else if (err instanceof Error) {
    // For unexpected errors
    errorMessage = err.message;
  }

  // Only include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    stack = err.stack;
  }

  // Standardized error response
  const errorResponse: ErrorResponse = {
    success: false,
    status: statusCode,
    message: errorMessage,
    ...(stack && { stack })
  };

  res.status(statusCode).json(errorResponse);
};

// Convenience method to create common error types
export const createError = {
  badRequest: (message = 'Bad Request') => 
    new ApiError(400, message),
  unauthorized: (message = 'Unauthorized') => 
    new ApiError(401, message),
  forbidden: (message = 'Forbidden') => 
    new ApiError(403, message),
  notFound: (message = 'Not Found') => 
    new ApiError(404, message),
  conflict: (message = 'Conflict') => 
    new ApiError(409, message),
  internalServer: (message = 'Internal Server Error') => 
    new ApiError(500, message)
};