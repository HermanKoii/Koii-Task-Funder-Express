import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

// Schema for hero name validation
const heroNameSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s-]+$/)
    .required()
    .messages({
      'string.empty': 'Hero name cannot be empty',
      'string.min': 'Hero name must be at least 2 characters long',
      'string.max': 'Hero name cannot exceed 50 characters',
      'string.pattern.base': 'Hero name can only contain letters, spaces, and hyphens'
    })
});

// Middleware for hero name validation
export const validateHeroName = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;

  // Validate hero name
  const { error } = heroNameSchema.validate({ name });

  if (error) {
    return res.status(400).json({
      error: 'Invalid hero name',
      details: error.details[0].message
    });
  }

  next();
};

// Schema for hero search query validation
const heroSearchSchema = Joi.object({
  q: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s-]+$/)
    .messages({
      'string.min': 'Search query must be at least 2 characters long',
      'string.max': 'Search query cannot exceed 50 characters',
      'string.pattern.base': 'Search query can only contain letters, spaces, and hyphens'
    })
});

// Middleware for hero search query validation
export const validateHeroSearch = (req: Request, res: Response, next: NextFunction) => {
  const { q } = req.query;

  // If no query is provided, skip validation
  if (!q) {
    return next();
  }

  // Validate search query
  const { error } = heroSearchSchema.validate({ q });

  if (error) {
    return res.status(400).json({
      error: 'Invalid search query',
      details: error.details[0].message
    });
  }

  next();
};

// New: Middleware for advanced hero validation
export const validateHeroDetails = (req: Request, res: Response, next: NextFunction) => {
  const { heroId } = req.params;
  const { power, age } = req.body;

  // Create a detailed validation schema
  const heroDetailsSchema = Joi.object({
    heroId: Joi.string().alphanum().min(3).max(30).required(),
    power: Joi.string().trim().min(2).max(50).optional(),
    age: Joi.number().integer().min(18).max(120).optional()
  });

  // Validate hero details
  const { error } = heroDetailsSchema.validate({ heroId, power, age });

  if (error) {
    return res.status(400).json({
      error: 'Invalid hero details',
      details: error.details[0].message
    });
  }

  next();
};