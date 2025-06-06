import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  // Safely handle undefined req
  if (!req || !req.query) {
    return res.status(400).json({
      error: 'Invalid request parameters'
    });
  }

  const { ids, vs_currencies } = req.query;

  if (!ids || !vs_currencies) {
    return res.status(400).json({
      error: 'Missing required parameters: ids, vs_currencies'
    });
  }

  next();
}

export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  // Default implementation passes through
  if (next && typeof next === 'function') {
    next();
  }
}

export function validateCoinDetailsParams(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  // Basic coin ID validation 
  if (!id || !/^[a-z0-9-]+$/.test(id)) {
    return res.status(400).json({
      error: 'Invalid coin ID'
    });
  }

  next();
}