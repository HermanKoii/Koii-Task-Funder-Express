import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request | undefined, res: Response | undefined, next: NextFunction | undefined) {
  // Safely handle undefined inputs
  if (!req || !res || !next) {
    if (res && 'status' in res) {
      return res.status(400).json({
        error: 'Invalid request parameters'
      });
    }
    return;
  }

  // Use non-null assertion for typescript
  const query = req.query || {};
  const { ids, vs_currencies } = query;

  if (!ids || !vs_currencies) {
    return res.status(400).json({
      error: 'Missing required parameters: ids, vs_currencies'
    });
  }

  next();
}

export function validateCoinListParams(req: Request | undefined, res: Response | undefined, next: NextFunction | undefined) {
  // Default implementation passes through with optional type handling
  if (next && typeof next === 'function') {
    next();
  }
}

export function validateCoinDetailsParams(req: Request | undefined, res: Response | undefined, next: NextFunction | undefined) {
  // Safely handle undefined inputs
  if (!req || !res || !next) {
    if (res && 'status' in res) {
      return res.status(400).json({
        error: 'Invalid request parameters'
      });
    }
    return;
  }

  // Use non-null assertion and additional checks
  const params = req.params || {};
  const { id } = params;

  // Basic coin ID validation 
  if (!id || !/^[a-z0-9-]+$/.test(id)) {
    return res.status(400).json({
      error: 'Invalid coin ID'
    });
  }

  next();
}