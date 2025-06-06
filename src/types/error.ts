/**
 * Custom error types for the Application
 * Provides a flexible and extensible error handling mechanism
 */
export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    message: string, 
    statusCode: number = 500, 
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Ensures the error can be properly traced
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Specific error types for different scenarios
 * Provides pre-configured error classes for common HTTP error cases
 */
export class ValidationError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 400);
    // Optional: attach validation details
    (this as any).details = details;
  }
}

export class NotFoundError extends ApiError {
  constructor(resourceName: string) {
    super(`${resourceName} not found`, 404);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Access forbidden') {
    super(message, 403);
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string = 'Internal Server Error') {
    super(message, 500);
  }
}