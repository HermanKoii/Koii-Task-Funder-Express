import { Request, Response, NextFunction } from 'express';

/**
 * Validate coin parameters
 * @param req Express request object
 * @param res Express response object
 * @param next Express next middleware function
 */
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;
  
  if (!coinId || typeof coinId !== 'string') {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Coin ID is required and must be a string'
    });
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
  const { limit } = req.query;
  
  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Limit must be a positive number'
    });
  }
  
  next();
}

/**
 * Validate single coin input
 * @param coin Coin object to validate
 * @returns Boolean indicating validity
 */
export function validateCoin(coin: any): boolean {
  return coin && 
         typeof coin.id === 'string' && 
         typeof coin.symbol === 'string' && 
         typeof coin.name === 'string' && 
         typeof coin.currentPrice === 'number';
}