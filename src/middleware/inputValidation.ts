import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin list parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const { page = 1, limit = 10 } = req.query;

  // Validate page number
  const pageNum = Number(page);
  const limitNum = Number(limit);

  if (isNaN(pageNum) || pageNum < 1) {
    return res.status(400).json({
      error: 'Invalid Page',
      message: 'Page must be a positive number'
    });
  }

  // Validate limit
  if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
    return res.status(400).json({
      error: 'Invalid Limit',
      message: 'Limit must be between 1 and 100'
    });
  }

  req.query.page = String(pageNum);
  req.query.limit = String(limitNum);

  next();
}

/**
 * Validate coin price parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid Coin ID',
      message: 'Coin ID is required and must be a non-empty string'
    });
  }

  next();
}

/**
 * Validate specific coin parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export function validateCoin(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid Coin',
      message: 'Coin ID is required and must be a non-empty string'
    });
  }

  next();
}