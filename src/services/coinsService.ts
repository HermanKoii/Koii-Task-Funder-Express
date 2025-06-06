import { CoinData, PaginationOptions } from '../types/coinTypes';

// Mock data for coins
const MOCK_COINS: CoinData[] = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
  { id: 'cardano', symbol: 'ada', name: 'Cardano' },
  { id: 'solana', symbol: 'sol', name: 'Solana' },
  { id: 'polkadot', symbol: 'dot', name: 'Polkadot' }
];

/**
 * Retrieve list of coins with optional pagination
 * @param options Pagination options
 * @returns Filtered list of coins
 */
export async function getCoins(options?: PaginationOptions): Promise<CoinData[]> {
  // Validate pagination parameters
  if (options?.page && options.page < 1) {
    throw new Error('Invalid pagination parameters');
  }

  if (options?.perPage && options.perPage <= 0) {
    throw new Error('Invalid pagination parameters');
  }

  // Apply pagination if specified
  if (options?.page && options.perPage) {
    const startIndex = (options.page - 1) * options.perPage;
    const endIndex = startIndex + options.perPage;
    return MOCK_COINS.slice(startIndex, endIndex);
  }

  // Return full list if no pagination
  return MOCK_COINS;
}