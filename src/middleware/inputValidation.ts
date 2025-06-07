import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../types/error';

/**
 * Validates input parameters for cryptocurrency-related requests
 */
export const validateCoinInput = (req: Request, res: Response, next: NextFunction) => {
  const { coinId } = req.params;

  if (!coinId) {
    throw new ValidationError('Coin ID is required');
  }

  // Basic validation for coin ID format
  if (typeof coinId !== 'string' || coinId.trim() === '') {
    throw new ValidationError('Invalid coin ID format');
  }

  next();
};