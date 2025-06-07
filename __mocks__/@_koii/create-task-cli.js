module.exports = {
  FundTask: jest.fn().mockResolvedValue(true),
  KPLEstablishConnection: jest.fn().mockResolvedValue(true),
  KPLFundTask: jest.fn().mockResolvedValue(true),
  establishConnection: jest.fn().mockResolvedValue(true),
  checkProgram: jest.fn().mockResolvedValue(true),
  KPLCheckProgram: jest.fn().mockResolvedValue(true),
  getTaskStateInfo: jest.fn().mockResolvedValue({
    stake_pot_account: 'test_stake_pot_account',
    token_type: null
  })
};