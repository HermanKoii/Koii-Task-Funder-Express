import { validateHeroName, validateHeroSearch } from './heroValidation';
import { Request, Response, NextFunction } from 'express';

describe('Hero Validation Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.Mock<NextFunction>;

  beforeEach(() => {
    mockNext = jest.fn();
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('validateHeroName', () => {
    it('should pass for valid hero names', () => {
      mockReq = { params: { name: 'Spider-Man' } };
      validateHeroName(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should reject names shorter than 2 characters', () => {
      mockReq = { params: { name: 'A' } };
      validateHeroName(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should reject names with invalid characters', () => {
      mockReq = { params: { name: 'Spider-Man 123!' } };
      validateHeroName(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('validateHeroSearch', () => {
    it('should pass for valid search queries', () => {
      mockReq = { query: { q: 'Superman' } };
      validateHeroSearch(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should skip validation when no query is provided', () => {
      mockReq = { query: {} };
      validateHeroSearch(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should reject search queries with invalid characters', () => {
      mockReq = { query: { q: 'Superman 123!' } };
      validateHeroSearch(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});