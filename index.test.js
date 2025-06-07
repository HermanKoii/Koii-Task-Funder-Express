const request = require('supertest');
const express = require('express');
const app = require('./index'); // Adjust this import based on your actual app export

describe('Express App', () => {
  test('should respond to /fundtask with verification', async () => {
    // You'll need to mock the Slack verification and other dependencies
    const mockSlackHeaders = {
      'x-slack-signature': 'mocked-signature',
      'x-slack-request-timestamp': Math.floor(Date.now() / 1000)
    };

    const mockBody = 'text=task123 100&user_id=U06NM9A2VC1&response_url=https://example.com';

    const response = await request(app)
      .post('/fundtask')
      .set(mockSlackHeaders)
      .send(mockBody);

    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Request received and verified integrity');
  });
});