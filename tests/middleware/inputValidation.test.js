const { validateHeroName, validateHeroSearch } = require('../../src/middleware/heroValidation');

describe('Hero Validation Middleware', () => {
  describe('validateHeroName', () => {
    const mockNext = jest.fn();

    it('should pass for valid hero names', () => {
      const mockReq = { params: { name: 'Spider-Man' } };
      const mockRes = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
      };

      validateHeroName(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should reject names shorter than 2 characters', () => {
      const mockReq = { params: { name: 'A' } };
      const mockRes = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
      };

      validateHeroName(mockReq, mockRes, mockNext);
      expect(mockRes.status).toHaveBeenCalledWith(400);
      expect(mockRes.json).toHaveBeenCalled();
    });
  });

  describe('validateHeroSearch', () => {
    const mockNext = jest.fn();

    it('should pass for valid search queries', () => {
      const mockReq = { query: { q: 'Superman' } };
      const mockRes = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
      };

      validateHeroSearch(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });

    it('should skip validation when no query is provided', () => {
      const mockReq = { query: {} };
      const mockRes = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
      };

      validateHeroSearch(mockReq, mockRes, mockNext);
      expect(mockNext).toHaveBeenCalled();
      expect(mockRes.status).not.toHaveBeenCalled();
    });
  });
});