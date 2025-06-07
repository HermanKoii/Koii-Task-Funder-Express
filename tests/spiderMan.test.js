import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app'; // Assuming app is now in src/app.ts

describe('Spider-Man Route', () => {
  it('should return Spider-Man details', async () => {
    const response = await request(app).get('/spiderMan');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: 'Spider-Man',
      description: 'Friendly neighborhood superhero with spider-like abilities',
      realName: 'Peter Parker',
      powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength'],
      firstAppearance: 'Amazing Fantasy #15'
    });
  });
});