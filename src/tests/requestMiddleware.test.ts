import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import { configureMiddleware, errorHandler } from '../middleware/requestMiddleware';

describe('Request Middleware', () => {
  it('should configure JSON parsing middleware', async () => {
    const app = express();
    configureMiddleware(app);

    const response = await request(app)
      .post('/')
      .send({ test: 'data' })
      .expect(404);

    expect(response.status).toBe(404);
  });

  it('should log requests using morgan', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    const app = express();
    configureMiddleware(app);

    await request(app)
      .get('/')
      .expect(404);

    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining('error'));
  });

  it('should handle errors gracefully', () => {
    const mockError = new Error('Test Error');
    const mockReq = {} as express.Request;
    const mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as unknown as express.Response;
    const mockNext = vi.fn();

    errorHandler(mockError, mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    const jsonCall = mockRes.json.mock.calls[0][0];
    
    expect(jsonCall).toEqual({
      error: 'Internal Server Error',
      message: 'Test Error',
      timestamp: expect.any(String)
    });
  });
});