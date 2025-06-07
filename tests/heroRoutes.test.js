import express from 'express';
import request from 'supertest';
import heroRoutes from '../src/routes/heroRoutes.js';

describe('Hero Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use('/heroes', heroRoutes);
  });

  describe('GET /heroes/ironMan', () => {
    it('should return Iron Man details', async () => {
      const response = await request(app).get('/heroes/ironMan');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        name: 'Tony Stark',
        heroName: 'Iron Man',
        abilities: ['Genius-level intellect', 'Advanced armor technology', 'Flight'],
        firstAppearance: 'Tales of Suspense #39 (1963)',
        powerLevel: 9
      });
    });
  });
});