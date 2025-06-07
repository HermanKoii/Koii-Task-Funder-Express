import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app'; // Adjust the path to your Express app

describe('Spider-Man Endpoint', () => {
  it('should return correct Spider-Man information', async () => {
    const response = await request(app)
      .get('/spiderMan')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      name: 'Spider-Man',
      description: 'Friendly neighborhood superhero with spider-like abilities',
      realName: 'Peter Parker',
      powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
      firstAppearance: 'Amazing Fantasy #15'
    });
  });

  it('should handle case variations', async () => {
    const variations = ['/spiderman', '/spider-man', '/SpiderMan'];
    
    for (const path of variations) {
      const response = await request(app)
        .get(path)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toEqual({
        name: 'Spider-Man',
        description: 'Friendly neighborhood superhero with spider-like abilities',
        realName: 'Peter Parker',
        powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
        firstAppearance: 'Amazing Fantasy #15'
      });
    }
  });

  it('should return 404 for invalid routes', async () => {
    const response = await request(app).get('/spider');
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Not Found');
  });
});