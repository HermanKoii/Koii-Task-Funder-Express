const request = require('supertest');
const app = require('../src/index');

describe('Coin List Endpoint', () => {
  test('GET /coins/list should return coins with default pagination', async () => {
    const response = await request(app).get('/coins/list');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(3);
  });

  test('GET /coins/list with pagination', async () => {
    const response = await request(app).get('/coins/list?page=1&per_page=2');
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  test('GET /coins/list with include_platform', async () => {
    const response = await request(app).get('/coins/list?include_platform=true');
    
    expect(response.status).toBe(200);
    expect(response.body[0].platforms).toBeDefined();
  });

  test('GET /coins/list with invalid page parameter', async () => {
    const response = await request(app).get('/coins/list?page=-1');
    
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test('GET /coins/list with invalid per_page parameter', async () => {
    const response = await request(app).get('/coins/list?per_page=300');
    
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  test('GET /coins/list with invalid include_platform', async () => {
    const response = await request(app).get('/coins/list?include_platform=invalid');
    
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});