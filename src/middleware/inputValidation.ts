import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const query = req.query || {};

  const { ids, vs_currencies } = query;

  if (!ids) {
    return res.status(400).json({ error: 'Missing coin ID parameter' });
  }

  if (!vs_currencies) {
    return res.status(400).json({ error: 'Missing currency parameter' });
  }

  next();
}

export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const query = req.query || {};

  const { order, per_page } = query;

  if (order && !['market_cap_desc', 'market_cap_asc'].includes(order as string)) {
    return res.status(400).json({ error: 'Invalid order parameter' });
  }

  if (per_page && (Number(per_page) < 1 || Number(per_page) > 250)) {
    return res.status(400).json({ error: 'Per page must be between 1 and 250' });
  }

  next();
}

export function validateCoin(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing coin ID' });
  }

  next();
}

export function validateCoinDetailsParams(coinId?: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const id = coinId || req.params.id;
    
    if (!id || !/^[a-z0-9-]+$/.test(id)) {
      return res.status(400).json({ error: 'Invalid coin ID' });
    }

    next();
  };
}