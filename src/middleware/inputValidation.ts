import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateCoinPriceParams = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    coin: Joi.string().lowercase().required()
  });

  const params = req?.params ?? {};
  const { error } = schema.validate(params);

  if (error) {
    return res.status(400).json({ 
      error: 'Validation Error', 
      details: error.details[0].message 
    });
  }

  next();
};

export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    limit: Joi.number().min(1).max(100).optional()
  });

  const query = req?.query ?? {};
  const { error } = schema.validate(query);

  if (error) {
    return res.status(400).json({ 
      error: 'Validation Error', 
      details: error.details[0].message 
    });
  }

  next();
};

export const validateCoinSearch = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    query: Joi.string().min(2).max(50).required()
  });

  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ 
      error: 'Validation Error', 
      details: error.details[0].message 
    });
  }

  next();
};

export const validateCoinDetailsParams = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      id: Joi.string().lowercase().pattern(/^[a-z-]+$/).required()
    });

    const params = req?.params ?? {};
    const { error } = schema.validate(params);

    if (error) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        details: error.details[0].message 
      });
    }

    next();
  };
};