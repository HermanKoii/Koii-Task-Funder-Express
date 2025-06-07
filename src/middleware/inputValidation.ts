import { Request, Response, NextFunction } from 'express';

// Validate coin price parameters
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  // Check if req object and params exist
  if (!req || !req.params) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request parameters are missing'
    });
  }

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
  // Check if req object and query exist
  if (!req || !req.query) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request query parameters are missing'
    });
  }

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

// Validate coin details parameters
export function validateCoinDetailsParams(req: Request, res: Response, next: NextFunction) {
  // Check if req object and params exist
  if (!req || !req.params) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request parameters are missing'
    });
  }

  const { coinId } = req.params;

  // Validate coin ID format
  if (!coinId || 
      typeof coinId !== 'string' || 
      !/^[a-z0-9-]+$/.test(coinId.toLowerCase())) {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Coin ID must be a valid alphanumeric string'
    });
  }

  next();
}

// Validate individual coin object
export function validateCoin(coin: any): boolean {
  if (!coin || typeof coin !== 'object') return false;
  
  const requiredFields = ['id', 'symbol', 'name', 'current_price', 'market_cap', 'market_cap_rank'];
  return requiredFields.every(field => 
    coin.hasOwnProperty(field) && 
    (field !== 'current_price' || typeof coin[field] === 'number') &&
    (field !== 'market_cap' || typeof coin[field] === 'number') &&
    (field !== 'market_cap_rank' || typeof coin[field] === 'number')
  );
}