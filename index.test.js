import request from 'supertest';
import { app, server } from './index.js';
import crypto from 'crypto';
import axios from 'axios';
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

jest.mock('axios');

describe('Task Funding Service', () => {
    let originalEnv;

    beforeEach(() => {
        originalEnv = { ...process.env };
        process.env.SIGNING_SECRET = 'test_secret';
        process.env.funder_keypair = JSON.stringify([1,2,3]);
    });

    afterEach(() => {
        process.env = originalEnv;
        jest.clearAllMocks();
        if (server) server.close();
    });

    const createSlackSignature = (body, timestamp) => {
        const sigBasestring = `v0:${timestamp}:${body}`;
        const hmac = crypto.createHmac('sha256', 'test_secret');
        return 'v0=' + hmac.update(sigBasestring).digest('hex');
    };

    it('should reject requests without valid Slack signature', async () => {
        const body = 'text=test_task 100&user_id=U02QTSK9R3N&response_url=http://example.com';
        const timestamp = Math.floor(Date.now() / 1000);
        
        const response = await request(app)
            .post('/fundtask')
            .set('x-slack-signature', 'invalid_signature')
            .set('x-slack-request-timestamp', timestamp)
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(response.text).toBe('Invalid request signature');
    });

    it('should reject requests from unauthorized users', async () => {
        const body = 'text=test_task 100&user_id=UNAUTHORIZED&response_url=http://example.com';
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = createSlackSignature(body, timestamp);

        axios.post.mockResolvedValue({});

        const response = await request(app)
            .post('/fundtask')
            .set('x-slack-signature', signature)
            .set('x-slack-request-timestamp', timestamp)
            .send(body);

        expect(response.text).toBe('Request received and verified integrity.');
        expect(axios.post).toHaveBeenCalledWith(expect.stringContaining('example.com'), {
            response_type: 'in_channel',
            text: expect.stringContaining('tag <@U06NM9A2VC1>')
        });
    });

    it('should successfully fund a task for authorized user', async () => {
        const body = 'text=test_task 100&user_id=U02QTSK9R3N&response_url=http://example.com';
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = createSlackSignature(body, timestamp);

        // Mock external dependencies
        axios.post.mockResolvedValue({});

        const response = await request(app)
            .post('/fundtask')
            .set('x-slack-signature', signature)
            .set('x-slack-request-timestamp', timestamp)
            .send(body);

        expect(response.text).toBe('Request received and verified integrity.');
    });

    it('should handle invalid request body gracefully', async () => {
        const body = 'invalid_body';
        const timestamp = Math.floor(Date.now() / 1000);
        const signature = createSlackSignature(body, timestamp);

        const response = await request(app)
            .post('/fundtask')
            .set('x-slack-signature', signature)
            .set('x-slack-request-timestamp', timestamp)
            .send(body);

        expect(response.text).toBe('Request received and verified integrity.');
    });
});