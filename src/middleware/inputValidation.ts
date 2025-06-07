import { Request, Response, NextFunction } from 'express';

type ValidationFunction = (req: Request, res: Response, next: NextFunction) => void;

export const validateCoinPriceParams = (): ValidationFunction[] => {
  return [
    (req, res, next) => {
      const params = req?.query || {};
      const { ids, vs_currencies } = params;
      
      if (!ids || !vs_currencies) {
        return res.status(400).json({ error: 'IDs and currencies are required' });
      }
      
      next();
    }
  ];
};

export const validateCoinListParams = (): ValidationFunction[] => {
  return [
    (req, res, next) => {
      const query = req?.query || {};
      const { limit, offset } = query;
      
      if (limit && (typeof limit !== 'string' || isNaN(Number(limit)))) {
        return res.status(400).json({ error: 'Invalid limit parameter' });
      }
      
      if (offset && (typeof offset !== 'string' || isNaN(Number(offset)))) {
        return res.status(400).json({ error: 'Invalid offset parameter' });
      }
      
      next();
    }
  ];
};

export const validateCoinDetailsParams = (): ValidationFunction[] => {
  return [
    (req, res, next) => {
      const params = req?.params || {};
      const { id } = params;
      
      if (!id || !/^[a-z0-9-]+$/.test(id)) {
        return res.status(400).json({ error: 'Invalid coin ID' });
      }
      
      next();
    }
  ];
};