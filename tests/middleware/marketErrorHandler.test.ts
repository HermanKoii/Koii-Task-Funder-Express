import { describe, it, expect } from '@jest/globals';
import { 
  MarketError, 
  InvalidParameterError, 
  ResourceNotFoundError, 
  RateLimitError 
} from '../../src/middleware/marketErrorHandler';

describe('Market Error Handler', () => {
  it('should create MarketError correctly', () => {
    const error = new MarketError('Test error', 500);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(500);
  });

  it('should create InvalidParameterError correctly', () => {
    const error = new InvalidParameterError('Invalid parameter');
    expect(error.message).toBe('Invalid parameter');
    expect(error.statusCode).toBe(400);
  });

  it('should create ResourceNotFoundError correctly', () => {
    const error = new ResourceNotFoundError('Resource not found');
    expect(error.message).toBe('Resource not found');
    expect(error.statusCode).toBe(404);
  });

  it('should create RateLimitError correctly', () => {
    const error = new RateLimitError();
    expect(error.message).toBe('Too many requests');
    expect(error.statusCode).toBe(429);
  });
});