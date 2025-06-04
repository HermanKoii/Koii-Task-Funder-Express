const request = require('supertest');
const app = require('../src/app');

describe('Health Check Endpoint', () => {
  it('should return 200 OK with correct response', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('message', 'CoinGecko Mock API is healthy and running');
    expect(response.body).toHaveProperty('timestamp');
    
    // Validate timestamp is a valid ISO date
    expect(() => new Date(response.body.timestamp)).not.toThrow();
  });
});