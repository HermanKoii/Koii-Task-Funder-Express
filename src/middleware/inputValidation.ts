import { Request, Response, NextFunction } from 'express';
import { ValidationError } from '../types/error';

/**
 * Middleware for input validation
 */
export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  // Add input validation logic here
  const { data } = req.body;

  if (!data) {
    throw new ValidationError('Input data is required');
  }

  next();
};