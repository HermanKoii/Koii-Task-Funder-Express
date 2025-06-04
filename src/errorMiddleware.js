/**
 * Centralized error handling middleware for the CoinGecko mock API
 * @module errorMiddleware
 */

/**
 * Standardized error response structure
 * @typedef {Object} ErrorResponse
 * @property {number} statusCode - HTTP status code
 * @property {string} status - Error status (e.g., 'error', 'fail')
 * @property {string} message - Human-readable error message
 * @property {Object} [details] - Optional additional error details
 */

/**
 * Error handling middleware for Express
 * @param {Error} err - The error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const errorHandler = (err, req, res, next) => {
  // Determine status code based on error type
  const statusCode = err.statusCode || 500;
  
  // Create standardized error response
  const errorResponse = {
    status: statusCode >= 500 ? 'error' : 'fail',
    statusCode,
    message: err.message || 'Internal Server Error',
    ...(err.details && { details: err.details })
  };

  // Log error (in a real-world scenario, use a proper logging mechanism)
  console.error(err);

  // Send standardized error response
  res.status(statusCode).json(errorResponse);
};

/**
 * Custom error class for creating standardized errors
 */
export class ApiError extends Error {
  /**
   * Create a new API error
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {Object} [details] - Optional error details
   */
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';
  }

  /**
   * Create a bad request error
   * @param {string} message - Error message
   * @param {Object} [details] - Optional error details
   * @returns {ApiError}
   */
  static badRequest(message, details = null) {
    return new ApiError(400, message, details);
  }

  /**
   * Create a not found error
   * @param {string} message - Error message
   * @param {Object} [details] - Optional error details
   * @returns {ApiError}
   */
  static notFound(message, details = null) {
    return new ApiError(404, message, details);
  }

  /**
   * Create an internal server error
   * @param {string} message - Error message
   * @param {Object} [details] - Optional error details
   * @returns {ApiError}
   */
  static internalServerError(message, details = null) {
    return new ApiError(500, message, details);
  }
}