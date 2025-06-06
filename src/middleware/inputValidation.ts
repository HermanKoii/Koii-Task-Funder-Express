import { Request, Response, NextFunction } from 'express';

export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { ids, vs_currencies } = req.query;

  if (!ids || !vs_currencies) {
    return res.status(400).json({
      error: 'Missing required parameters: ids, vs_currencies'
    });
  }

  next();
}

export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  // Add validation logic for coin list parameters
  next();
}

export function validateCoin(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  if (!coinId) {
    return res.status(400).json({
      error: 'Missing coin ID'
    });
  }

  next();
}