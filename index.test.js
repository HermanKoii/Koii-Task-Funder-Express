import { jest } from '@jest/globals';

// Mock the external dependencies
jest.mock('@_koii/create-task-cli', () => ({
  FundTask: jest.fn().mockResolvedValue(true),
  KPLEstablishConnection: jest.fn(),
  KPLFundTask: jest.fn(),
  getTaskStateInfo: jest.fn(),
  KPLCheckProgram: jest.fn(),
  establishConnection: jest.fn(),
  checkProgram: jest.fn()
}));

describe('Task Funding Service', () => {
  it('should have mocked dependencies', () => {
    expect(jest.isMockFunction(require('@_koii/create-task-cli').FundTask)).toBe(true);
  });
});