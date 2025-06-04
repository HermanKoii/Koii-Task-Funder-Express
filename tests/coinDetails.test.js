import { describe, test, expect } from 'vitest';
import request from 'supertest';
import app from '../src/server.js';

describe('Coin Details Endpoint', () => {
  test('GET /coins/:id returns correct details for existing coin', async () => {
    const response = await request(app).get('/coins/bitcoin');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin'
    });
  });

  test('GET /coins/:id returns correct details with case-insensitive lookup', async () => {
    const response = await request(app).get('/coins/BITCOIN');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin'
    });
  });

  test('GET /coins/:id returns 404 for non-existent coin', async () => {
    const response = await request(app).get('/coins/nonexistent');
    
    expect(response.statusCode).toBe(404);
    expect(response.body).toMatchObject({
      error: 'Cryptocurrency not found',
      code: 'COIN_NOT_FOUND'
    });
  });
});