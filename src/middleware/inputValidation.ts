import { Request, Response, NextFunction } from 'express';

export const validateCoinPriceParams = (req: Request, res: Response, next: NextFunction) => {
  const { coin, currency } = req.params;
  
  if (!coin || !currency) {
    return res.status(400).json({ error: 'Coin and currency are required' });
  }
  
  next();
};

export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  // Example validation logic for coin list
  next();
};

export const validateCoin = (req: Request, res: Response, next: NextFunction) => {
  const { coin } = req.params;
  
  if (!coin) {
    return res.status(400).json({ error: 'Coin is required' });
  }
  
  next();
};