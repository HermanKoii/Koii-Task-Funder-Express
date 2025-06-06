import { describe, it, expect } from 'vitest';
import { validateCoinId, sanitizeCoinId } from '../../src/utils/coinValidation.js';

describe('Coin ID Validation', () => {
  describe('validateCoinId', () => {
    it('should return false for non-string inputs', () => {
      expect(validateCoinId(null)).toBe(false);
      expect(validateCoinId(undefined)).toBe(false);
      expect(validateCoinId(123)).toBe(false);
      expect(validateCoinId({})).toBe(false);
    });

    it('should return false for empty or whitespace strings', () => {
      expect(validateCoinId('')).toBe(false);
      expect(validateCoinId('   ')).toBe(false);
    });

    it('should return true for valid coin IDs', () => {
      expect(validateCoinId('bitcoin')).toBe(true);
      expect(validateCoinId('ethereum')).toBe(true);
      expect(validateCoinId('binance-coin')).toBe(true);
    });

    it('should handle case-insensitive validation', () => {
      expect(validateCoinId('Bitcoin')).toBe(true);
      expect(validateCoinId('ETHEREUM')).toBe(true);
    });

    it('should reject IDs with special characters', () => {
      expect(validateCoinId('bitcoin!')).toBe(false);
      expect(validateCoinId('ethereum@')).toBe(false);
    });
  });

  describe('sanitizeCoinId', () => {
    it('should sanitize valid coin IDs', () => {
      expect(sanitizeCoinId('Bitcoin')).toBe('bitcoin');
      expect(sanitizeCoinId('  Ethereum  ')).toBe('ethereum');
    });

    it('should throw an error for invalid coin IDs', () => {
      expect(() => sanitizeCoinId('')).toThrow('Invalid coin ID');
      expect(() => sanitizeCoinId('bitcoin!')).toThrow('Invalid coin ID');
    });
  });
});