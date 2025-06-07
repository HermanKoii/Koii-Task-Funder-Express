import { describe, it, expect, vi } from 'vitest';
import { 
  FundTask, 
  KPLEstablishConnection, 
  KPLFundTask, 
  getTaskStateInfo, 
  KPLCheckProgram 
} from '@_koii/create-task-cli';

// Mock external dependencies
vi.mock('@_koii/create-task-cli', () => ({
  FundTask: vi.fn().mockResolvedValue(true),
  KPLEstablishConnection: vi.fn(),
  KPLFundTask: vi.fn(),
  getTaskStateInfo: vi.fn(),
  KPLCheckProgram: vi.fn()
}));

describe('Task Funding Module', () => {
  it('should mock external task funding dependencies', () => {
    expect(FundTask).toBeDefined();
    expect(KPLEstablishConnection).toBeDefined();
    expect(KPLFundTask).toBeDefined();
    expect(getTaskStateInfo).toBeDefined();
    expect(KPLCheckProgram).toBeDefined();
  });
});