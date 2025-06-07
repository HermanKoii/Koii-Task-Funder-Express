import { Request, Response, NextFunction } from 'express';

// Validate coin price parameters
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  const { coinId } = req.params;

  if (!coinId || typeof coinId !== 'string' || coinId.trim().length === 0) {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Coin ID is required and must be a non-empty string'
    });
  }

  next();
}

// Validate coin list parameters
export function validateCoinListParams(req: Request, res: Response, next: NextFunction) {
  const { limit, offset } = req.query;

  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Limit must be a positive number'
    });
  }

  if (offset && (isNaN(Number(offset)) || Number(offset) < 0)) {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Offset must be a non-negative number'
    });
  }

  next();
}

// Validate individual coin object
export function validateCoin(coin: any): boolean {
  if (!coin || typeof coin !== 'object') return false;
  
  const requiredFields = ['id', 'symbol', 'name', 'price'];
  return requiredFields.every(field => 
    coin.hasOwnProperty(field) && 
    (field !== 'price' || typeof coin[field] === 'number')
  );
}