import { Response } from 'express';
import { ErrorResponseUtil, HttpErrorCode } from '../../src/utils/error-response';

describe('ErrorResponseUtil', () => {
  let errorResponseUtil: ErrorResponseUtil;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    errorResponseUtil = new ErrorResponseUtil();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  it('should send error response with correct status and message', () => {
    const errorCode = HttpErrorCode.BAD_REQUEST;
    const errorMessage = 'Test error';

    errorResponseUtil.sendErrorResponse(
      mockResponse as Response, 
      errorCode, 
      errorMessage
    );

    expect(mockResponse.status).toHaveBeenCalledWith(errorCode);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: errorCode,
        message: errorMessage,
        details: undefined
      }
    });
  });
});