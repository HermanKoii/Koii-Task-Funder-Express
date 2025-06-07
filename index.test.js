import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import request from 'supertest';
import crypto from 'crypto';

// Mock the external dependencies
vi.mock('@_koii/create-task-cli', () => ({
  FundTask: vi.fn().mockResolvedValue(true),
  KPLEstablishConnection: vi.fn(),
  KPLFundTask: vi.fn(),
  getTaskStateInfo: vi.fn(),
  KPLCheckProgram: vi.fn(),
  establishConnection: vi.fn(),
  checkProgram: vi.fn()
}));

// Import the actual app after mocking
import app from './index';

describe('Funding Task Endpoint', () => {
  it('should verify Slack request signature', async () => {
    // Test Slack request verification logic
    const timestamp = Math.floor(Date.now() / 1000);
    const rawBody = 'text=test&user_id=test_user';
    
    const sigBasestring = `v0:${timestamp}:${rawBody}`;
    const hmac = crypto.createHmac('sha256', process.env.SIGNING_SECRET || '');
    const signature = 'v0=' + hmac.update(sigBasestring).digest('hex');

    const response = await request(app)
      .post('/fundtask')
      .send(rawBody)
      .set('X-Slack-Signature', signature)
      .set('X-Slack-Request-Timestamp', timestamp.toString());

    expect(response.status).toBe(200);
  });
});