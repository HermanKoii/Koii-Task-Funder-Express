import { describe, it, expect } from '@jest/globals';
import { HttpErrorCode, errorResponseUtil } from '../../src/utils/error-response';
import { Response } from 'express';

// Create a mock response object
function mockResponse(): Partial<Response> {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
}

describe('ErrorResponseUtil', () => {
  describe('sendErrorResponse', () => {
    it('should send a formatted error response', () => {
      const mockRes = mockResponse() as Response;
      const errorCode = HttpErrorCode.BAD_REQUEST;
      const message = 'Test error message';
      const details = { field: 'test' };

      errorResponseUtil.sendErrorResponse(mockRes, errorCode, message, details);

      expect(mockRes.status).toHaveBeenCalledWith(errorCode);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: errorCode,
          message,
          details
        }
      });
    });
  });

  describe('sendValidationError', () => {
    it('should send a validation error response', () => {
      const mockRes = mockResponse() as Response;
      const validationErrors = { name: 'required' };

      errorResponseUtil.sendValidationError(mockRes, validationErrors);

      expect(mockRes.status).toHaveBeenCalledWith(HttpErrorCode.BAD_REQUEST);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: HttpErrorCode.BAD_REQUEST,
          message: 'Validation Error',
          details: validationErrors
        }
      });
    });
  });

  describe('sendNotFoundError', () => {
    it('should send a not found error response', () => {
      const mockRes = mockResponse() as Response;
      const resourceName = 'User';

      errorResponseUtil.sendNotFoundError(mockRes, resourceName);

      expect(mockRes.status).toHaveBeenCalledWith(HttpErrorCode.NOT_FOUND);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: HttpErrorCode.NOT_FOUND,
          message: `${resourceName} not found`
        }
      });
    });
  });
});