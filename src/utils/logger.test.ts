import winston from 'winston';
import { logError, logWarn, logInfo, logDebug, handleError } from './logger';

// Mock winston completely
jest.mock('winston', () => ({
  createLogger: jest.fn(() => ({
    log: jest.fn(),
    error: jest.fn()
  })),
  format: {
    combine: jest.fn(),
    timestamp: jest.fn(),
    errors: jest.fn(),
    splat: jest.fn(),
    json: jest.fn()
  },
  transports: {
    Console: jest.fn(),
    File: jest.fn()
  }
}));

describe('Logger Utility', () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('logError should log an error message', () => {
    const message = 'Test error message';
    const meta = { context: 'test' };

    logError(message, meta);

    // Verify the log method was called
    const logger = winston.createLogger();
    expect(logger.log).toHaveBeenCalledWith('error', message, meta);
  });

  test('logWarn should log a warning message', () => {
    const message = 'Test warning message';
    const meta = { context: 'test' };

    logWarn(message, meta);

    const logger = winston.createLogger();
    expect(logger.log).toHaveBeenCalledWith('warn', message, meta);
  });

  test('logInfo should log an info message', () => {
    const message = 'Test info message';
    const meta = { context: 'test' };

    logInfo(message, meta);

    const logger = winston.createLogger();
    expect(logger.log).toHaveBeenCalledWith('info', message, meta);
  });

  test('logDebug should log a debug message', () => {
    const message = 'Test debug message';
    const meta = { context: 'test' };

    logDebug(message, meta);

    const logger = winston.createLogger();
    expect(logger.log).toHaveBeenCalledWith('debug', message, meta);
  });

  test('handleError should log error details and use console.error', () => {
    const error = new Error('Test error');
    const context = { module: 'test' };

    handleError(error, context);

    const logger = winston.createLogger();
    expect(logger.error).toHaveBeenCalledWith('Unhandled Error', {
      message: error.message,
      stack: error.stack,
      context
    });
    expect(consoleSpy).toHaveBeenCalledWith('Unhandled Error:', error.message, context);
  });
});