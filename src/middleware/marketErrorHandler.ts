import { Request, Response, NextFunction } from 'express';

/**
 * Custom error types for market-related errors
 */
export class MarketError extends Error {
  statusCode: number;
  originalType?: string;

  constructor(message: string, statusCode: number = 500, originalType?: string) {
    super(message);
    this.name = originalType || 'MarketError';
    this.statusCode = statusCode;
    this.originalType = originalType;
  }
}

/**
 * Specific error types with enhanced logging and context
 */
export class InvalidParameterError extends MarketError {
  constructor(message: string, context?: Record<string, unknown>) {
    super(message, 400, 'InvalidParameterError');
    this.context = context;
  }
}

export class ResourceNotFoundError extends MarketError {
  constructor(message: string, resourceId?: string) {
    super(message, 404, 'ResourceNotFoundError');
    this.resourceId = resourceId;
  }
}

export class RateLimitError extends MarketError {
  constructor(message: string = 'Too many requests', retryAfter?: number) {
    super(message, 429, 'RateLimitError');
    this.retryAfter = retryAfter;
  }
}

/**
 * Market endpoint error handling middleware
 * Provides structured error responses for different market-related scenarios
 * Supports detailed logging and context preservation
 */
export const marketErrorHandler = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  const timestamp = new Date().toISOString();
  const requestPath = req.path;
  const requestMethod = req.method;

  console.error(`[Market Error] ${err.message}`, {
    timestamp,
    path: requestPath,
    method: requestMethod,
    stack: err.stack
  });

  // Handle specific market error types
  if (err instanceof MarketError) {
    return res.status(err.statusCode).json({
      error: true,
      type: err.originalType || err.name,
      message: err.message,
      timestamp,
      path: requestPath
    });
  }

  // Handle unexpected errors
  res.status(500).json({
    error: true,
    type: 'UnexpectedError',
    message: 'An unexpected error occurred in the market data service',
    timestamp,
    path: requestPath
  });
};