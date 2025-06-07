import { Response } from 'express';
import { ErrorResponseUtil } from '../../src/utils/error-response';
import { HttpErrorCode } from '../../src/utils/error-response';

// Mock response utility
function mockResponse(): Partial<Response> {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  };
}

describe('ErrorResponseUtil', () => {
  let errorResponseUtil: ErrorResponseUtil;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    errorResponseUtil = new ErrorResponseUtil();
    mockRes = mockResponse();
  });

  it('should send error response with correct structure', () => {
    const errorCode = HttpErrorCode.BAD_REQUEST;
    const errorMessage = 'Test error';
    const details = { field: 'test' };

    const response = errorResponseUtil.sendErrorResponse(
      mockRes as Response, 
      errorCode, 
      errorMessage, 
      details
    );

    expect(mockRes.status).toHaveBeenCalledWith(errorCode);
    expect(mockRes.json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details
      }
    });
  });

  it('should send validation error response', () => {
    const validationErrors = { username: 'Invalid username' };

    const response = errorResponseUtil.sendValidationError(
      mockRes as Response, 
      validationErrors
    );

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

  it('should send not found error response', () => {
    const resourceName = 'User';

    const response = errorResponseUtil.sendNotFoundError(
      mockRes as Response, 
      resourceName
    );

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