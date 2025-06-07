import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('Spider-Man Route', () => {
  it('should return Spider-Man details', async () => {
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
});