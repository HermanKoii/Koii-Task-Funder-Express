import { Response } from 'express';
import * as winston from 'winston';
import { HttpErrorCode } from './http-error-codes';

/**
 * Interface for standardized error response
 */
export interface ErrorResponse {
  success: boolean;
  error: {
    code: number;
    message: string;
    details?: string | Record<string, unknown>;
  };
}

/**
 * Utility for creating standardized error responses
 */
export class ErrorResponseUtil {
  private logger: winston.Logger;

  constructor() {
    // Initialize Winston logger with improved configuration
    this.logger = winston.createLogger({
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.simple()
        }),
        new winston.transports.File({ 
          filename: 'error.log',
          maxsize: 5242880, // 5MB
          maxFiles: 5
        })
      ]
    });
  }

  /**
   * Send a standardized error response
   * @param res Express response object
   * @param errorCode HTTP error code
   * @param message Error message
   * @param details Optional additional error details
   */
  public sendErrorResponse(
    res: Response, 
    errorCode: number, 
    message: string, 
    details?: string | Record<string, unknown>
  ): Response {
    const errorResponse: ErrorResponse = {
      success: false,
      error: {
        code: errorCode,
        message,
        details
      }
    };

    // Log the error with additional context
    this.logger.error(message, { 
      code: errorCode, 
      details,
      timestamp: new Date().toISOString()
    });

    return res.status(errorCode).json(errorResponse);
  }

  /**
   * Create a validation error response
   * @param res Express response object
   * @param validationErrors Validation error details
   */
  public sendValidationError(
    res: Response, 
    validationErrors: Record<string, unknown>
  ): Response {
    return this.sendErrorResponse(
      res, 
      HttpErrorCode.BAD_REQUEST, 
      'Validation Error', 
      validationErrors
    );
  }

  /**
   * Create a not found error response
   * @param res Express response object
   * @param resourceName Name of the resource not found
   */
  public sendNotFoundError(
    res: Response, 
    resourceName: string
  ): Response {
    return this.sendErrorResponse(
      res, 
      HttpErrorCode.NOT_FOUND, 
      `${resourceName} not found`
    );
  }
}

// Export a singleton instance
export const errorResponseUtil = new ErrorResponseUtil();