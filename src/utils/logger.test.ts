import logger, { logError, logWarn, logInfo, logDebug, handleError } from './logger';

// Mock logger methods
jest.mock('winston', () => {
  const mLogger = {
    log: jest.fn(),
    error: jest.fn()
  };
  
  return {
    createLogger: jest.fn(() => mLogger),
    format: {
      combine: jest.fn(),
      timestamp: jest.fn(),
      errors: jest.fn(),
      splat: jest.fn(),
      json: jest.fn(),
      colorize: jest.fn(),
      simple: jest.fn()
    },
    transports: {
      Console: jest.fn(),
      File: jest.fn()
    }
  };
});

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

    const loggerInstance = logger as any;
    expect(loggerInstance.log).toHaveBeenCalledWith('error', message, meta);
  });

  test('logWarn should log a warning message', () => {
    const message = 'Test warning message';
    const meta = { context: 'test' };

    logWarn(message, meta);

    const loggerInstance = logger as any;
    expect(loggerInstance.log).toHaveBeenCalledWith('warn', message, meta);
  });

  test('logInfo should log an info message', () => {
    const message = 'Test info message';
    const meta = { context: 'test' };

    logInfo(message, meta);

    const loggerInstance = logger as any;
    expect(loggerInstance.log).toHaveBeenCalledWith('info', message, meta);
  });

  test('logDebug should log a debug message', () => {
    const message = 'Test debug message';
    const meta = { context: 'test' };

    logDebug(message, meta);

    const loggerInstance = logger as any;
    expect(loggerInstance.log).toHaveBeenCalledWith('debug', message, meta);
  });

  test('handleError should log error details and use console.error', () => {
    const error = new Error('Test error');
    const context = { module: 'test' };

    handleError(error, context);

    const loggerInstance = logger as any;
    expect(loggerInstance.error).toHaveBeenCalledWith('Unhandled Error', {
      message: error.message,
      stack: error.stack,
      context
    });
    expect(consoleSpy).toHaveBeenCalledWith('Unhandled Error:', error.message, context);
  });
});