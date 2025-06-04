import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';
import { errorHandler, ApiError } from '../src/errorMiddleware.js';

describe('Error Middleware', () => {
  const createTestApp = (middleware) => {
    const app = express();
    
    // Route that throws an error for testing
    app.get('/error', (req, res, next) => {
      throw new ApiError(400, 'Test bad request');
    });

    // Route that throws a custom error
    app.get('/custom-error', (req, res, next) => {
      throw new ApiError(422, 'Validation Failed', { 
        validationErrors: ['Invalid input'] 
      });
    });

    // Route that throws a generic error
    app.get('/generic-error', (req, res, next) => {
      throw new Error('Generic error');
    });

    // Apply error middleware
    app.use(middleware);

    return app;
  };

  it('should handle ApiError with standard format', async () => {
    const app = createTestApp(errorHandler);

    const response = await request(app).get('/error');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      status: 'fail',
      statusCode: 400,
      message: 'Test bad request'
    });
  });

  it('should handle ApiError with additional details', async () => {
    const app = createTestApp(errorHandler);

    const response = await request(app).get('/custom-error');

    expect(response.status).toBe(422);
    expect(response.body).toEqual({
      status: 'fail',
      statusCode: 422,
      message: 'Validation Failed',
      details: {
        validationErrors: ['Invalid input']
      }
    });
  });

  it('should handle generic Error with default values', async () => {
    const app = createTestApp(errorHandler);

    const response = await request(app).get('/generic-error');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      status: 'error',
      statusCode: 500,
      message: 'Internal Server Error'
    });
  });

  describe('ApiError static methods', () => {
    it('should create bad request error', () => {
      const error = ApiError.badRequest('Invalid parameters');
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe('Invalid parameters');
    });

    it('should create not found error', () => {
      const error = ApiError.notFound('Resource not found');
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Resource not found');
    });

    it('should create internal server error', () => {
      const error = ApiError.internalServerError('Something went wrong');
      expect(error.statusCode).toBe(500);
      expect(error.message).toBe('Something went wrong');
    });
  });
});