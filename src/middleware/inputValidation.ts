import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../types/error';

/**
 * Validates input parameters for cryptocurrency-related requests
 */
export const validateCoinInput = (req: Request, res: Response, next: NextFunction) => {
  const { coinId } = req.params;

  // First check if coinId exists
  if (!coinId) {
    throw new ValidationError('Coin ID is required');
  }

  // Then check for invalid format
  if (coinId.trim() === '') {
    throw new ValidationError('Invalid coin ID format');
  }

  next();
};