import { describe, it, expect } from 'vitest';
import request from 'supertest';
import express from 'express';
import { spiderManHandler } from '../src/routes/spiderMan.js';

const app = express();
app.get('/spiderMan', spiderManHandler);

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