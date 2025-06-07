import { Request, Response, NextFunction } from 'express';

export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const { order, per_page, page } = req.query;

  // Validate order parameter
  if (order && typeof order !== 'string') {
    return res.status(400).json({ error: 'Invalid order parameter' });
  }

  // Validate per_page parameter
  const perPage = Number(per_page);
  if (per_page && (isNaN(perPage) || perPage < 1 || perPage > 250)) {
    return res.status(400).json({ error: 'Per page must be between 1 and 250' });
  }

  // Validate page parameter
  const pageNum = Number(page);
  if (page && (isNaN(pageNum) || pageNum < 1)) {
    return res.status(400).json({ error: 'Page must be a positive number' });
  }

  next();
}

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { ids, vs_currencies } = req.query;

  // Validate ids parameter
  if (!ids || typeof ids !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing coin ids' });
  }

  // Validate vs_currencies parameter
  if (!vs_currencies || typeof vs_currencies !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing versus currencies' });
  }

  next();
}

export function validateCoin(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string') {
    return res.status(400).json({ error: 'Invalid coin ID' });
  }

  next();
}