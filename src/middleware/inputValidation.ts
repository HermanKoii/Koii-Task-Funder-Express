import { Request, Response, NextFunction } from 'express';

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction) => void;

// Validate coin price parameters
export const validateCoinPriceParams = (): ValidationMiddleware[] => {
  return [
    (req, res, next) => {
      const { ids, vs_currencies } = req.query;

      // Validate ids
      if (!ids || typeof ids !== 'string' || !/^[a-zA-Z0-9,]+$/.test(ids)) {
        res.status(400);
        return res.json({ error: 'Invalid Coin IDs' });
      }

      // Validate vs_currencies
      if (!vs_currencies || typeof vs_currencies !== 'string' || !/^[a-zA-Z0-9,]+$/.test(vs_currencies)) {
        res.status(400);
        return res.json({ error: 'Invalid Currencies' });
      }

      next();
    }
  ];
};

// Validate coin list parameters
export const validateCoinListParams = (): ValidationMiddleware[] => {
  return [
    (req, res, next) => {
      const { include_platform } = req.query;

      // Optional validation for include_platform
      if (include_platform && !['true', 'false'].includes(include_platform as string)) {
        res.status(400);
        return res.json({ error: 'Invalid include_platform' });
      }

      next();
    }
  ];
};

// Validate coin details parameters
export const validateCoinDetailsParams = (): ValidationMiddleware[] => {
  return [
    (req, res, next) => {
      const { id } = req.params;

      // Validate coin ID
      if (!id || typeof id !== 'string' || !/^[a-zA-Z0-9-]+$/.test(id)) {
        res.status(400);
        return res.json({ error: 'Invalid Coin ID' });
      }

      next();
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