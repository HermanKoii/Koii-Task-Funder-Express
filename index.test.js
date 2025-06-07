import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from './index.js';

// Mock external dependencies
vi.mock('@_koii/create-task-cli', () => ({
  FundTask: vi.fn().mockResolvedValue(true)
}));

describe('Express Application', () => {
  it('should handle basic health check', async () => {
    const response = await request(app).get('/coins/bitcoin');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'bitcoin');
  });
});