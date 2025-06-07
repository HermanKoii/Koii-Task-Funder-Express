import { validateHeroName, validateHeroSearch } from './heroValidation';
import { Request, Response, NextFunction } from 'express';

describe('validateHeroName', () => {
  const mockNext: NextFunction = jest.fn();

  it('should pass for valid hero names', () => {
    const mockReq = { params: { name: 'Spider-Man' } } as Request;
    const mockRes = { 
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    validateHeroName(mockReq, mockRes, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should reject invalid hero names', () => {
    const mockReq = { params: { name: 'Spider-Man 123!' } } as Request;
    const mockRes = { 
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    validateHeroName(mockReq, mockRes, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      error: 'Invalid hero name'
    }));
  });
});