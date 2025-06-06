import { describe, it, expect } from 'vitest';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

describe('Environment Configuration', () => {
  it('should have required environment variables', () => {
    // Server Configuration
    expect(process.env.PORT).toBeDefined();
    expect(process.env.NODE_ENV).toBeDefined();

    // MongoDB Configuration
    expect(process.env.MONGODB_URI).toBeDefined();

    // JWT Configuration
    expect(process.env.JWT_SECRET).toBeDefined();
    expect(process.env.JWT_EXPIRATION).toBeDefined();
  });

  it('should validate environment variable types', () => {
    // Validate PORT is a number
    expect(Number.isInteger(Number(process.env.PORT))).toBe(true);

    // Validate JWT expiration is a valid string
    expect(['1h', '7d', '30d']).toContain(process.env.JWT_EXPIRATION);
  });

  it('should have secure default configurations', () => {
    // Check that sensitive flags are properly configured
    expect(process.env.NODE_ENV).not.toBe('production');
  });
});