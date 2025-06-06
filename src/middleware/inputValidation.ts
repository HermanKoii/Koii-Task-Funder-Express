import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const coinId = req?.params?.coinId ?? '';

  if (!coinId || typeof coinId !== 'string' || coinId.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing coin ID' });
  }

  next();
}

export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const limit = req?.query?.limit ?? undefined;
  const offset = req?.query?.offset ?? undefined;

  if (limit && (isNaN(Number(limit)) || Number(limit) < 1)) {
    return res.status(400).json({ error: 'Invalid limit parameter' });
  }

  if (offset && (isNaN(Number(offset)) || Number(offset) < 0)) {
    return res.status(400).json({ error: 'Invalid offset parameter' });
  }

  next();
}

export function validateCoinSearchParams(req: Request, res: Response, next: NextFunction) {
  const query = req?.query?.query ?? '';

  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  next();
}

export function validateCoinDetailsParams(req: Request, res: Response, next: NextFunction) {
  const id = req?.params?.id ?? '';

  if (!id || typeof id !== 'string' || !/^[a-z0-9-]+$/.test(id.toLowerCase())) {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }

  next();
}