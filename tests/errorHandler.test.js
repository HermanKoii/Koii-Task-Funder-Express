import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Error Handling Middleware', () => {
  // Test 404 Not Found
  it('should return 404 for non-existent routes', async () => {
    const response = await request(app).get('/non-existent-route');
    
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual({
      message: 'Not Found',
      status: 404
    });
  });

  // Test 404 for unsupported methods on non-existent route
  it('should return 404 for unsupported HTTP methods', async () => {
    const response = await request(app).post('/non-existent-route');
    
    expect(response.status).toBe(404);
    expect(response.body.error).toEqual({
      message: 'Not Found',
      status: 404
    });
  });
});