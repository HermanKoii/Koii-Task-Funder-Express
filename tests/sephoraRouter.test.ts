import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/index';

describe('Sephora Router', () => {
  it('should return healthy status on health check', async () => {
    const response = await request(app).get('/api/sephora/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'healthy');
    expect(response.body).toHaveProperty('message', 'Sephora API is up and running');
  });

  it('should return products endpoint', async () => {
    const response = await request(app).get('/api/sephora/products');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Product list (placeholder)');
    expect(response.body).toHaveProperty('products');
  });

  it('should return product details', async () => {
    const productId = '123';
    const response = await request(app).get(`/api/sephora/products/${productId}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', `Product details for ID: ${productId}`);
    expect(response.body).toHaveProperty('product', null);
  });
});