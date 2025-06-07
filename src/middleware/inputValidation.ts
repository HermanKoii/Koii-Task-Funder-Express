import { Request, Response, NextFunction } from 'express';
import cryptoPrices from '../data/mock-crypto-prices.json';

export const validateCoinPriceParams = (req: Request, res: Response, next: NextFunction) => {
  if (!req || !req.query) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request object or query is undefined'
    });
  }

  const coins = req.query.coins as string || '';
  
  if (!coins || coins.trim() === '') {
    return res.status(400).json({
      error: 'Invalid Coins',
      message: 'Coin list cannot be empty'
    });
  }

  const coinList = coins.split(',').map(coin => coin.trim());
  const invalidCoins = coinList.filter(coin => !cryptoPrices[coin as keyof typeof cryptoPrices]);

  if (invalidCoins.length > 0) {
    return res.status(400).json({
      error: 'Invalid Coins',
      message: `Unsupported coins: ${invalidCoins.join(', ')}`
    });
  }

  next();
};

export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  if (!req || !req.query) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request object or query is undefined'
    });
  }

  const limit = parseInt(req.query.limit as string, 10);
  const offset = parseInt(req.query.offset as string, 10);

  if (isNaN(limit) || isNaN(offset) || limit <= 0 || offset < 0) {
    return res.status(400).json({
      error: 'Invalid Pagination',
      message: 'Limit and offset must be valid positive numbers'
    });
  }

  next();
};

export const validateCoinDetailsParams = (req: Request, res: Response, next: NextFunction) => {
  if (!req || !req.params) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request object or params is undefined'
    });
  }

  const coinId = req.params.coinId as string || '';

  if (!coinId || coinId.trim() === '') {
    return res.status(400).json({
      error: 'Invalid Coin ID',
      message: 'Coin ID cannot be empty'
    });
  }

  if (!cryptoPrices[coinId as keyof typeof cryptoPrices]) {
    return res.status(404).json({
      error: 'Coin Not Found',
      message: `Coin with ID ${coinId} not found`
    });
  }

  next();
};