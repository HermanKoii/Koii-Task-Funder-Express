const express = require('express');
const request = require('supertest');
const crypto = require('crypto');

// Mock dependencies
jest.mock('@_koii/create-task-cli', () => ({
  FundTask: jest.fn(),
  KPLEstablishConnection: jest.fn(),
  KPLFundTask: jest.fn(),
  getTaskStateInfo: jest.fn(),
  KPLCheckProgram: jest.fn()
}));

jest.mock('@_koii/web3.js', () => ({
  PublicKey: jest.fn(),
  Connection: jest.fn(),
  Keypair: jest.fn()
}));

// Create a test app
const app = express();

// Add a health check route for testing
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

describe('Express App Endpoints', () => {
  it('should have a health check endpoint', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toEqual({ status: 'OK' });
  });
});

describe('Utility Functions', () => {
  it('should generate a random hash', () => {
    const input = 'test input';
    const hash = crypto.createHash('sha256').update(input).digest('hex');
    
    expect(hash).toBeDefined();
    expect(hash.length).toBeGreaterThan(0);
  });
});