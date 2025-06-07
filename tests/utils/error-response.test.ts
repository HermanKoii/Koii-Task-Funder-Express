import { describe, it, expect, vi } from 'vitest';
import { ErrorResponseUtil, HttpErrorCode } from '../../src/utils/error-response';

// Mock Express response
const mockResponse = () => ({
  status: vi.fn().mockReturnThis(),
  json: vi.fn().mockReturnThis()
});

describe('ErrorResponseUtil', () => {
  let errorResponseUtil: ErrorResponseUtil;

  beforeEach(() => {
    errorResponseUtil = new ErrorResponseUtil();
  });

  describe('sendErrorResponse', () => {
    it('should send a standardized error response', () => {
      const mockRes = mockResponse();
      const errorCode = HttpErrorCode.BAD_REQUEST;
      const message = 'Test error message';
      const details = { field: 'test' };

      errorResponseUtil.sendErrorResponse(mockRes as any, errorCode, message, details);

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
      const mockRes = mockResponse();
      const validationErrors = { username: 'Invalid format' };

      errorResponseUtil.sendValidationError(mockRes as any, validationErrors);

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
      const mockRes = mockResponse();
      const resourceName = 'User';

      errorResponseUtil.sendNotFoundError(mockRes as any, resourceName);

      expect(mockRes.status).toHaveBeenCalledWith(HttpErrorCode.NOT_FOUND);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: false,
        error: {
          code: HttpErrorCode.NOT_FOUND,
          message: 'User not found'
        }
      });
    });
  });
});