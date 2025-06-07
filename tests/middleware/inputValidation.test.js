import { describe, it, expect, vi } from 'vitest';
import { validateCoinInput } from '../../src/middleware/inputValidation';
import { ValidationError } from '../../src/types/error';

describe('Input Validation Middleware', () => {
  it('should throw ValidationError if no coinId is provided', () => {
    const req = { params: {} };
    const res = {};
    const next = vi.fn();

    expect(() => validateCoinInput(req, res, next)).toThrow(ValidationError);
    expect(() => validateCoinInput(req, res, next)).toThrow('Coin ID is required');
  });

  it('should throw ValidationError if coinId is an empty string', () => {
    const req = { params: { coinId: '' } };
    const res = {};
    const next = vi.fn();

    expect(() => validateCoinInput(req, res, next)).toThrow(ValidationError);
    expect(() => validateCoinInput(req, res, next)).toThrow('Invalid coin ID format');
  });

  it('should call next if coinId is valid', () => {
    const req = { params: { coinId: 'bitcoin' } };
    const res = {};
    const next = vi.fn();

    validateCoinInput(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});