const express = require('express');
const request = require('supertest');
const crypto = require('crypto');

// Import your main app or create a test app
const app = express();

describe('Basic Server Functionality', () => {
  it('should have a health check endpoint', async () => {
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'OK' });
    });

    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'OK' });
  });

  it('should generate a unique identifier', () => {
    const id = crypto.randomBytes(16).toString('hex');
    expect(id).toBeTruthy();
    expect(id.length).toBe(32);
  });
});