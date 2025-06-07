import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { id, vs_currency, order, per_page, page } = req.query;

  // Basic validation for coin price parameters
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing coin ID' });
  }

  if (vs_currency && typeof vs_currency !== 'string') {
    return res.status(400).json({ error: 'Invalid currency' });
  }

  next();
}

export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const { order, per_page, page } = req.query;

  // Optional parameters validation
  if (order && typeof order !== 'string') {
    return res.status(400).json({ error: 'Invalid order parameter' });
  }

  const pageNum = page ? Number(page) : 1;
  const perPageNum = per_page ? Number(per_page) : 100;

  if (isNaN(pageNum) || pageNum < 1) {
    return res.status(400).json({ error: 'Invalid page number' });
  }

  if (isNaN(perPageNum) || perPageNum < 1 || perPageNum > 250) {
    return res.status(400).json({ error: 'Invalid items per page' });
  }

  next();
}

export function validateCoin(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string' || coinId.trim() === '') {
    return res.status(400).json({ error: 'Invalid or missing coin ID' });
  }

  next();
}