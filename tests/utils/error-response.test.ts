import { Response } from 'express';
import { ErrorResponseUtil } from '../../src/utils/error-response';
import { HttpErrorCode } from '../../src/utils/http-error-codes';

// Mock response object
function mockResponse(): Partial<Response> {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis()
  } as unknown as Response;
}

describe('ErrorResponseUtil', () => {
  let errorResponseUtil: ErrorResponseUtil;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    errorResponseUtil = new ErrorResponseUtil();
    mockRes = mockResponse();
  });

  it('should send error response with correct details', () => {
    const errorCode = HttpErrorCode.BAD_REQUEST;
    const errorMessage = 'Test error';

    errorResponseUtil.sendErrorResponse(
      mockRes as Response, 
      errorCode, 
      errorMessage
    );

    expect(mockRes.status).toHaveBeenCalledWith(errorCode);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      success: false,
      error: {
        code: errorCode,
        message: errorMessage
      }
    }));
  });

  it('should send validation error with details', () => {
    const validationErrors = { field: 'Invalid input' };

    errorResponseUtil.sendValidationError(
      mockRes as Response, 
      validationErrors
    );

    expect(mockRes.status).toHaveBeenCalledWith(HttpErrorCode.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      success: false,
      error: {
        code: HttpErrorCode.BAD_REQUEST,
        message: 'Validation Error',
        details: validationErrors
      }
    }));
  });
});