import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validateCoinPriceParams = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    coin: Joi.string().lowercase().required()
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateCoinListParams = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    limit: Joi.number().min(1).max(100).optional()
  });

  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

export const validateCoinSearch = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    query: Joi.string().min(2).max(50).required()
  });

  const { error } = schema.validate(req.query);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};