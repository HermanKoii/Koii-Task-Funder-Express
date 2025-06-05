const { describe, it, expect, jest: jestMock } = require('@jest/globals');
const { validateGameRoomStatus } = require('../../src/utils/validationUtils');

describe('Input Validation', () => {
  it('should validate game room status correctly', () => {
    const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
    const invalidStatuses = ['unknown', '', null, undefined];

    validStatuses.forEach(status => {
      expect(validateGameRoomStatus(status)).toBeTruthy();
    });

    invalidStatuses.forEach(status => {
      expect(validateGameRoomStatus(status)).toBeFalsy();
    });
  });
});