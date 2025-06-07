import _winston from 'winston';

// Capture the format methods to ensure compatibility
const { format } = _winston;
const { combine, timestamp, errors, splat, json, colorize, simple } = format;

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Create a custom logger configuration
const logger = _winston.createLogger({
  levels,
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    splat(),
    json()
  ),
  transports: [
    // Console logging
    new _winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        simple()
      )
    }),
    
    // File logging for errors
    new _winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5 * 1024 * 1024, // 5MB max file size
      maxFiles: 5
    }),
    
    // File logging for combined logs
    new _winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5 * 1024 * 1024, // 5MB max file size
      maxFiles: 5
    })
  ]
});

// Logging utility methods
export const logError = (message: string, meta?: any) => {
  logger.log('error', message, meta);
};

export const logWarn = (message: string, meta?: any) => {
  logger.log('warn', message, meta);
};

export const logInfo = (message: string, meta?: any) => {
  logger.log('info', message, meta);
};

export const logDebug = (message: string, meta?: any) => {
  logger.log('debug', message, meta);
};

// Centralized error handler
export const handleError = (error: Error, context?: any) => {
  logger.error('Unhandled Error', {
    message: error.message,
    stack: error.stack,
    context
  });
  
  // Log to console as well
  console.error('Unhandled Error:', error.message, context);
};

export default logger;