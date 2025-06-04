import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('Error Handling', () => {
  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');
    
    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: 'Endpoint not found',
        details: expect.objectContaining({
          method: 'GET',
          path: '/non-existent-route'
        })
      })
    );
  });

  it('should return 405 for unsupported HTTP methods', async () => {
    const response = await request(app).post('/');
    
    expect(response.status).toBe(405);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'error',
        message: 'Method Not Allowed',
        details: expect.objectContaining({
          method: 'POST',
          path: '/',
          supportedMethods: ['GET']
        })
      })
    );
  });
});