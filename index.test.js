jest.mock('@_koii/create-task-cli', () => ({
  FundTask: jest.fn().mockResolvedValue(true),
  KPLEstablishConnection: jest.fn().mockResolvedValue(true)
}));

describe('Index Module', () => {
  it('should have mocked dependencies', async () => {
    const mockTaskCli = require('@_koii/create-task-cli');
    
    await expect(mockTaskCli.FundTask()).resolves.toBe(true);
    await expect(mockTaskCli.KPLEstablishConnection()).resolves.toBe(true);
  });
});