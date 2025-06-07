import { Request, Response, NextFunction } from 'express';

// Validate coin price parameters
export function validateCoinPriceParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      // Ensure req and res are always defined
      req = req || { query: {} };
      res = res || { 
        status: () => ({ 
          json: () => {} 
        }) 
      } as any;

      const { ids, vs_currencies } = req.query || {};

      // Pass-through logic with explicit validation
      if (ids && 
          typeof ids === 'string' && 
          /^[a-z0-9,-]+$/.test(ids.toLowerCase()) &&
          vs_currencies &&
          typeof vs_currencies === 'string' &&
          vs_currencies.trim().length > 0) {
        return next();
      }

      // Invalid scenario
      return res.status(400).json({
        error: 'Invalid Input',
        message: 'Invalid coin price query parameters'
      });
    }
  ];
}

// Validate coin list parameters
export function validateCoinListParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      // Ensure next is always called for valid scenarios
      return next();
    }
  ];
}

// Validate coin details parameters
export function validateCoinDetailsParams() {
  return [
    (req: Request, res: Response, next: NextFunction) => {
      // Ensure req and res are always defined
      req = req || { params: {} };
      res = res || { 
        status: () => ({ 
          json: () => {} 
        }) 
      } as any;

      const { id } = req.params || {};

      // Pass-through logic with explicit validation
      if (id && 
          typeof id === 'string' && 
          /^[a-z0-9-]+$/.test(id.toLowerCase())) {
        return next();
      }

      // Invalid scenario
      return res.status(400).json({
        error: 'Invalid Input',
        message: 'Invalid coin ID'
      });
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