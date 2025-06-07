const express = require('express');
const request = require('supertest');
const app = require('./index.js');

describe('Express App Endpoints', () => {
  it('should have a /fundtask endpoint', async () => {
    const response = await request(app)
      .post('/fundtask')
      .send({
        text: 'test-task-id 100',
        user_id: 'U06NM9A2VC1',
        response_url: 'https://example.com'
      });
    
    expect(response.status).toBe(200);
  });
});