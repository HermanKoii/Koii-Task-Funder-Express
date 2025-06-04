const express = require('express');
const request = require('supertest');
const crypto = require('crypto');

// Mock the external dependencies
jest.mock('@_koii/create-task-cli', () => ({
  FundTask: jest.fn(),
  KPLEstablishConnection: jest.fn(),
  KPLFundTask: jest.fn(),
  getTaskStateInfo: jest.fn().mockResolvedValue({
    stake_pot_account: 'mockStakePotAccount',
    token_type: null
  }),
  establishConnection: jest.fn(),
  checkProgram: jest.fn(),
  KPLCheckProgram: jest.fn()
}));

jest.mock('axios', () => ({
  post: jest.fn().mockResolvedValue({})
}));

// Import the app after mocking dependencies
const app = require('./index');

describe('Task Funding Service', () => {
  let server;

  beforeAll(() => {
    // Set up environment variables for testing
    process.env.SIGNING_SECRET = 'test_secret';
    process.env.funder_keypair = JSON.stringify([1,2,3,4]); // Mock keypair
  });

  beforeEach(() => {
    server = app.listen(0); // Use a random available port
  });

  afterEach(() => {
    server.close();
  });

  function createSlackSignature(body, secret, timestamp) {
    const sigBasestring = `v0:${timestamp}:${body}`;
    const hmac = crypto.createHmac('sha256', secret);
    return 'v0=' + hmac.update(sigBasestring).digest('hex');
  }

  it('should reject requests without valid Slack signature', async () => {
    const body = 'text=fund+task123+100&user_id=U06NM9A2VC1&response_url=http://example.com';
    const timestamp = Math.floor(Date.now() / 1000);
    
    const response = await request(server)
      .post('/fundtask')
      .set('x-slack-signature', 'invalid_signature')
      .set('x-slack-request-timestamp', timestamp)
      .send(body);
    
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Invalid request signature');
  });

  it('should reject requests from unauthorized users', async () => {
    const body = 'text=fund+task123+100&user_id=UNAUTHORIZED_USER&response_url=http://example.com';
    const timestamp = Math.floor(Date.now() / 1000);
    
    const signature = createSlackSignature(body, process.env.SIGNING_SECRET, timestamp);
    
    const response = await request(server)
      .post('/fundtask')
      .set('x-slack-signature', signature)
      .set('x-slack-request-timestamp', timestamp)
      .send(body);
    
    expect(response.statusCode).toBe(200);
    // Additional assertions can be added to check response content
  });

  it('should successfully fund a task for authorized user', async () => {
    const body = 'text=task123+100&user_id=U06NM9A2VC1&response_url=http://example.com';
    const timestamp = Math.floor(Date.now() / 1000);
    
    const signature = createSlackSignature(body, process.env.SIGNING_SECRET, timestamp);
    
    const response = await request(server)
      .post('/fundtask')
      .set('x-slack-signature', signature)
      .set('x-slack-request-timestamp', timestamp)
      .send(body);
    
    expect(response.statusCode).toBe(200);
    // Add more specific assertions based on the expected behavior
  });
});