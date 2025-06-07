const request = require('supertest');
const server = require('./index');

describe('Hero Routes', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('should get Spider-Man details', async () => {
    const response = await request(server).get('/heroes/spiderman');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      name: 'Spider-Man',
      realName: 'Peter Parker',
      powers: ['Wall-crawling', 'Spider-sense', 'Web-shooting']
    });
  });

  it('should handle case-insensitive hero name', async () => {
    const response = await request(server).get('/heroes/SpiderMAN');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      name: 'Spider-Man',
      realName: 'Peter Parker',
      powers: ['Wall-crawling', 'Spider-sense', 'Web-shooting']
    });
  });

  it('should return 404 for unknown hero', async () => {
    const response = await request(server).get('/heroes/batman');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Hero not found');
  });

  it('should list all heroes', async () => {
    const response = await request(server).get('/heroes');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Spider-Man' }),
        expect.objectContaining({ name: 'Iron Man' }),
        expect.objectContaining({ name: 'Captain America' })
      ])
    );
  });
});