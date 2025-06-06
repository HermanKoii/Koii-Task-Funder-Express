import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin details parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoinDetailsParams(req: Request, res: Response, next: NextFunction) {
  const params = req.params || {};
  const { id } = params;
  
  if (!id) {
    return res.status(400).json({ error: 'Coin ID is required' });
  }

  const coinIdRegex = /^[a-z0-9-]+$/i;
  if (!coinIdRegex.test(id)) {
    return res.status(400).json({ error: 'Invalid coin ID format' });
  }

  next();
}

/**
 * Validate coin price parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const params = req.params || {};
  const { coinId } = params;
  
  if (!coinId) {
    return res.status(400).json({ error: 'Coin ID is required' });
  }

  if (typeof coinId !== 'string') {
    return res.status(400).json({ error: 'Invalid coin ID format' });
  }

  next();
}

/**
 * Validate coin list parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const query = req.query || {};
  const { page = 1, limit = 10 } = query;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (isNaN(parsedPage) || parsedPage < 1) {
    return res.status(400).json({ error: 'Invalid page number' });
  }

  if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
    return res.status(400).json({ error: 'Invalid limit. Must be between 1 and 100' });
  }

  next();
}

/**
 * Validate individual coin data
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoinData(req: Request, res: Response, next: NextFunction) {
  const body = req.body || {};
  const { coin } = body;

  if (!coin) {
    return res.status(400).json({ error: 'Coin data is required' });
  }

  if (!coin.id || !coin.name || !coin.symbol) {
    return res.status(400).json({ error: 'Coin must have id, name, and symbol' });
  }

  next();
}