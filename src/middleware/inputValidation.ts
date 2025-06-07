import { Request, Response, NextFunction } from 'express';

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;

// Validate coin price parameters
export const validateCoinPriceParams = (): ValidationMiddleware[] => {
  return [
    (req, res, next) => {
      const { ids, vs_currencies } = req.query;

      // If params are valid, call next
      if (ids && vs_currencies && 
          typeof ids === 'string' && 
          typeof vs_currencies === 'string' &&
          /^[a-zA-Z0-9,]+$/.test(ids) && 
          /^[a-zA-Z0-9,]+$/.test(vs_currencies)) {
        return next();
      }

      // If invalid, return error response
      res.status(400);
      res.json({ error: 'Invalid parameters' });
    }
  ];
};

// Validate coin list parameters
export const validateCoinListParams = (): ValidationMiddleware[] => {
  return [
    (req, res, next) => {
      const { include_platform } = req.query;

      // If include_platform is valid or not provided, call next
      if (!include_platform || 
          ['true', 'false'].includes(include_platform as string)) {
        return next();
      }

      // If invalid, return error response
      res.status(400);
      res.json({ error: 'Invalid include_platform' });
    }
  ];
};

// Validate coin details parameters
export const validateCoinDetailsParams = (): ValidationMiddleware[] => {
  return [
    (req, res, next) => {
      const { id } = req.params;

      // If ID is valid
      if (id && 
          typeof id === 'string' && 
          /^[a-zA-Z0-9-]+$/.test(id)) {
        return next();
      }

      // If invalid, return error response
      res.status(400);
      res.json({ error: 'Invalid Coin ID' });
    }
  ];
};

// Existing single middleware exports for backward compatibility
export const validateCoin = (req: Request, res: Response, next: NextFunction) => {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Invalid coin ID', 
      message: 'Coin ID is required and must be a non-empty string' 
    });
  }

  next();
};