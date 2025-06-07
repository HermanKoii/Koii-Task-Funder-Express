import { Request, Response, NextFunction } from 'express';

// Validate coin price parameters
export function validateCoinPriceParams(req: Request, res: Response, next: NextFunction) {
  // Ensure default values or mock values for req and res
  if (!req) req = {} as Request;
  if (!res) res = { status: () => ({ json: () => {} }) } as Response;
  if (!req.params) req.params = {};

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
  // Ensure default values or mock values for req and res
  if (!req) req = {} as Request;
  if (!res) res = { status: () => ({ json: () => {} }) } as Response;
  if (!req.query) req.query = {};

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
  // Ensure default values or mock values for req and res
  if (!req) req = {} as Request;
  if (!res) res = { status: () => ({ json: () => {} }) } as Response;
  if (!req.params) req.params = {};

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
  
  const requiredFields = [
    'id', 'symbol', 'name', 'current_price', 
    'market_cap', 'market_cap_rank', 'total_volume', 
    'price_change_percentage_24h', 'last_updated'
  ];
  return requiredFields.every(field => 
    coin.hasOwnProperty(field) && 
    (field !== 'current_price' || typeof coin[field] === 'number') &&
    (field !== 'market_cap' || typeof coin[field] === 'number') &&
    (field !== 'market_cap_rank' || typeof coin[field] === 'number') &&
    (field !== 'total_volume' || typeof coin[field] === 'number') &&
    (field !== 'price_change_percentage_24h' || typeof coin[field] === 'number')
  );
}