import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin list parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  // Use default values if query params are not provided
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;

  // Validate page number
  if (isNaN(page) || page < 1) {
    return res.status(400).json({
      error: 'Invalid Page',
      message: 'Page must be a positive number'
    });
  }

  // Validate limit
  if (isNaN(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({
      error: 'Invalid Limit',
      message: 'Limit must be between 1 and 100'
    });
  }

  // Attach validated and sanitized values to request
  req.query.page = String(page);
  req.query.limit = String(limit);

  next();
}

/**
 * Validate coin price parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const coinId = req.params.coinId;

  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid Coin ID',
      message: 'Coin ID is required and must be a non-empty string'
    });
  }

  // Optional: Add regex validation for coin ID format
  const coinIdRegex = /^[a-z0-9-]+$/i;
  if (!coinIdRegex.test(coinId)) {
    return res.status(400).json({
      error: 'Invalid Coin ID Format',
      message: 'Coin ID can only contain letters, numbers, and hyphens'
    });
  }

  next();
}

/**
 * Validate coin details parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next function
 */
export function validateCoinDetailsParams(req: Request, res: Response, next: NextFunction) {
  const coinId = req.params.coinId;

  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid Coin ID',
      message: 'Coin ID is required and must be a non-empty string'
    });
  }

  // Optional: Add regex validation for coin ID format
  const coinIdRegex = /^[a-z0-9-]+$/i;
  if (!coinIdRegex.test(coinId)) {
    return res.status(400).json({
      error: 'Invalid Coin ID Format',
      message: 'Coin ID can only contain letters, numbers, and hyphens'
    });
  }

  next();
}