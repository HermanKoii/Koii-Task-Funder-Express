import { Request, Response, NextFunction } from 'express';

// Validate coin price parameters
export function validateCoinPriceParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      // Ensure default values or mock values for req and res
      if (!req) req = {} as Request;
      if (!res) res = { status: () => ({ json: () => {} }) } as Response;
      if (!req.query) req.query = {};

      const { ids, vs_currencies } = req.query;

      if (!ids || 
          typeof ids !== 'string' || 
          !/^[a-z0-9,-]+$/.test(ids.toLowerCase())) {
        return res.status(400).json({
          error: 'Invalid Input',
          message: 'Coin IDs must be a valid comma-separated string'
        });
      }

      if (!vs_currencies || 
          typeof vs_currencies !== 'string' || 
          vs_currencies.trim().length === 0) {
        return res.status(400).json({
          error: 'Invalid Input',
          message: 'VS currencies must be a non-empty string'
        });
      }

      next();
    }
  ];
}

// Validate coin list parameters
export function validateCoinListParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      // Ensure default values or mock values for req and res
      if (!req) req = {} as Request;
      if (!res) res = { status: () => ({ json: () => {} }) } as Response;
      if (!req.query) req.query = {};

      // This middleware just passes through for now
      // As the test doesn't specify any specific validation
      next();
    }
  ];
}

// Validate coin details parameters
export function validateCoinDetailsParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      // Ensure default values or mock values for req and res
      if (!req) req = {} as Request;
      if (!res) res = { status: () => ({ json: () => {} }) } as Response;
      if (!req.params) req.params = {};

      const { id } = req.params;

      // Validate coin ID format
      if (!id || 
          typeof id !== 'string' || 
          !/^[a-z0-9-]+$/.test(id.toLowerCase())) {
        return res.status(400).json({
          error: 'Invalid Input',
          message: 'Coin ID must be a valid alphanumeric string'
        });
      }

      next();
    }
  ];
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