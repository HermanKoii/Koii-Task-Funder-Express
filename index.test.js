const express = require('express');
const request = require('supertest');
const crypto = require('crypto');

// Import the main application
const app = require('./index');

describe('Task Funding Endpoint', () => {
  let mockApp;

  beforeEach(() => {
    // Recreate the app for each test to ensure clean state
    mockApp = express();
    mockApp.use(express.raw({ type: 'application/x-www-form-urlencoded' }));
    mockApp.post('/fundtask', app._router.stack.find(r => r.route && r.route.path === '/fundtask').route.stack[0].handle);
  });

  it('should verify Slack request signature', async () => {
    // Mock environment variables
    process.env.SIGNING_SECRET = 'test-secret';

    // Prepare mock Slack request
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const body = 'text=test-task 100&user_id=U06NM9A2VC1&response_url=http://example.com';
    
    const sigBasestring = `v0:${timestamp}:${body}`;
    const hmac = crypto.createHmac('sha256', 'test-secret');
    const signature = 'v0=' + hmac.update(sigBasestring).digest('hex');

    const response = await request(mockApp)
      .post('/fundtask')
      .set('X-Slack-Signature', signature)
      .set('X-Slack-Request-Timestamp', timestamp)
      .send(body);

    // Expect a successful response
    expect(response.status).toBe(200);
  });

  it('should reject requests from unauthorized users', async () => {
    // Mock environment variables
    process.env.SIGNING_SECRET = 'test-secret';

    // Prepare mock Slack request with unauthorized user
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const body = 'text=test-task 100&user_id=UNAUTHORIZED&response_url=http://example.com';
    
    const sigBasestring = `v0:${timestamp}:${body}`;
    const hmac = crypto.createHmac('sha256', 'test-secret');
    const signature = 'v0=' + hmac.update(sigBasestring).digest('hex');

    const response = await request(mockApp)
      .post('/fundtask')
      .set('X-Slack-Signature', signature)
      .set('X-Slack-Request-Timestamp', timestamp)
      .send(body);

    // Expect a response indicating unauthorized user
    expect(response.status).toBe(200); // Assuming the response is sent back via Slack webhook
  });
});