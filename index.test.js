const { 
  FundTask, 
  KPLEstablishConnection, 
  KPLFundTask 
} = require('@_koii/create-task-cli');

// Mock the external dependencies
jest.mock('@_koii/create-task-cli', () => ({
  FundTask: jest.fn().mockResolvedValue(true),
  KPLEstablishConnection: jest.fn().mockResolvedValue(true),
  KPLFundTask: jest.fn().mockResolvedValue(true),
}));

describe('Task Funding Functionality', () => {
  it('should have mocked Koii task functions', async () => {
    await expect(FundTask()).resolves.toBe(true);
    await expect(KPLEstablishConnection()).resolves.toBe(true);
    await expect(KPLFundTask()).resolves.toBe(true);
  });
});