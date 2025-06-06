import express from 'express';
import morgan from 'morgan';

/**
 * Configure common middleware for Express application
 * @param app Express application instance
 */
export function configureMiddleware(app: express.Application): void {
  // HTTP request logging
  app.use(morgan('combined'));

  // JSON parsing
  app.use(express.json());

  // URL-encoded body parsing
  app.use(express.urlencoded({ extended: true }));
}

/**
 * Global error handler middleware
 * @param err Error object
 * @param req Express request
 * @param res Express response
 * @param next Express next function
 */
export function errorHandler(
  err: Error, 
  req: express.Request, 
  res: express.Response, 
  next: express.NextFunction
): void {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
}