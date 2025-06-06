import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req?: Request, res?: Response, next?: NextFunction) {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const { ids, vs_currencies } = req.query || {};

      if (!ids || typeof ids !== 'string' || !/^[a-z0-9,-]+$/.test(ids.toLowerCase())) {
        return res.status(400).json({ error: 'Invalid coin IDs' });
      }

      if (!vs_currencies || typeof vs_currencies !== 'string' || vs_currencies.trim() === '') {
        return res.status(400).json({ error: 'Invalid currency list' });
      }

      next();
    }
  ];

  if (req && res && next) {
    validators[0](req, res, next);
  }

  return validators;
}

export function validateCoinListParams(req?: Request, res?: Response, next?: NextFunction) {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const { limit, offset } = req.query || {};

      if (limit && (isNaN(Number(limit)) || Number(limit) < 1)) {
        return res.status(400).json({ error: 'Invalid limit parameter' });
      }

      if (offset && (isNaN(Number(offset)) || Number(offset) < 0)) {
        return res.status(400).json({ error: 'Invalid offset parameter' });
      }

      next();
    }
  ];

  if (req && res && next) {
    validators[0](req, res, next);
  }

  return validators;
}

export function validateCoinSearchParams(req?: Request, res?: Response, next?: NextFunction) {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const { query } = req.query || {};

      if (!query || typeof query !== 'string' || query.trim().length === 0) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      next();
    }
  ];

  if (req && res && next) {
    validators[0](req, res, next);
  }

  return validators;
}

export function validateCoinDetailsParams(req?: Request, res?: Response, next?: NextFunction) {
  const validators = [
    (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params || {};

      if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/.test(id.toLowerCase())) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }

      next();
    }
  ];

  if (req && res && next) {
    validators[0](req, res, next);
  }

  return validators;
}