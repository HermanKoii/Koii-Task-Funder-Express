/**
 * Middleware for handling unsupported HTTP methods
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const methodNotAllowedHandler = (req, res, next) => {
  const error = new Error('Method Not Allowed');
  error.status = 405;
  next(error);
};

/**
 * Middleware for handling routes that are not found
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const notFoundHandler = (req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
};

/**
 * Global error handling middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const errorHandler = (err, req, res, next) => {
  // Default to 500 if no status is set
  const status = err.status || 500;
  
  res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
};