import { Request, Response, NextFunction } from 'express';

export const validateCoinPriceParams = (req: Request, res: Response, next: NextFunction) => {
  const coinId = req?.params?.coinId;
  
  if (!coinId || typeof coinId !== 'string') {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Coin ID is required and must be a string'
    });
  }
  
  next();
};

export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  const limit = req?.query?.limit;
  
  if (limit && (isNaN(Number(limit)) || Number(limit) <= 0)) {
    return res.status(400).json({
      error: 'Invalid Input',
      message: 'Limit must be a positive number'
    });
  }
  
  next();
};

export function validateCoin(coin: any): boolean {
  return coin && 
         typeof coin.id === 'string' && 
         typeof coin.symbol === 'string' && 
         typeof coin.name === 'string' && 
         typeof coin.current_price === 'number';
}

export const validateCoinDetailsParams = (options = {}) => {
  return {
    validate: (req: Request, res: Response, next: NextFunction) => {
      const coinId = req?.params?.id;
      
      if (!coinId || typeof coinId !== 'string' || !/^[a-z0-9-]+$/.test(coinId)) {
        return res.status(400).json({
          error: 'Invalid Input',
          message: 'Invalid coin ID'
        });
      }
      
      next();
    }
  };
};