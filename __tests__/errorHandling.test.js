const request = require('supertest');
const app = require('../src/app');

describe('Error Handling', () => {
  describe('Not Found Routes', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/non-existent-route');
      
      expect(response.status).toBe(404);
      expect(response.body).toEqual({
        status: 'error',
        message: 'Endpoint not found',
        details: {
          method: 'GET',
          path: '/non-existent-route'
        }
      });
    });

    it('should handle different HTTP methods on non-existent routes', async () => {
      const methods = ['post', 'put', 'delete', 'patch'];
      
      for (const method of methods) {
        const response = await request(app)[method]('/some-random-route');
        
        expect(response.status).toBe(404);
        expect(response.body.status).toBe('error');
        expect(response.body.message).toBe('Endpoint not found');
      }
    });
  });
});