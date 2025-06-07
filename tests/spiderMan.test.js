const { describe, it, expect } = require('vitest');
const request = require('supertest');
const app = require('../index.js');

describe('Spider-Man Route', () => {
  it('should return Spider-Man details', async () => {
    const response = await request(app)
      .get('/spiderMan')
      .expect(200);

    expect(response.body).toEqual({
      name: 'Spider-Man',
      realName: 'Peter Parker',
      firstAppearance: 'Amazing Fantasy #15',
      powers: ['Wall-crawling', 'Spider-sense', 'Superhuman strength']
    });
  });
});