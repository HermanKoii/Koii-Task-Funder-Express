/**
 * Centralized error handling middleware for mock API
 * @module errorHandler
 */

/**
 * Handle 404 Not Found errors for non-existent routes
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Endpoint not found',
    details: {
      method: req.method,
      path: req.originalUrl
    }
  });
};

/**
 * Handle method not allowed errors for unsupported HTTP methods
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
export const methodNotAllowedHandler = (req, res) => {
  res.status(405).json({
    status: 'error',
    message: 'Method Not Allowed',
    details: {
      method: req.method,
      path: req.originalUrl,
      supportedMethods: ['GET'] // Update with actual supported methods
    }
  });
};

/**
 * Global error handler to catch any unhandled errors
 * @param {Error} err - Error object
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
export const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.message : {}
  });
};