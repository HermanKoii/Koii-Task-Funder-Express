import fs from 'fs';
import path from 'path';

/**
 * Interface representing the structure of a coin in the original data
 */
interface RawCoinData {
  id: string;
  symbol: string;
  name: string;
  market_cap?: number;
}

/**
 * Interface representing the transformed coin list item
 */
interface TransformedCoin {
  id: string;
  symbol: string;
  name: string;
  market_cap?: number;
}

/**
 * Transforms the raw cryptocurrency data into the required coins list format
 * @param {string} [filePath] - Optional path to the crypto-prices.json file
 * @returns {TransformedCoin[]} Transformed list of coins
 */
export function transformCoinsList(filePath?: string): TransformedCoin[] {
  // Use provided file path or default to project root
  const resolvedPath = filePath || path.resolve(process.cwd(), 'crypto-prices.json');

  try {
    // Read the file contents
    const rawData = fs.readFileSync(resolvedPath, 'utf8');
    const coinData: RawCoinData[] = JSON.parse(rawData);

    // Transform the data
    return coinData.map(coin => ({
      id: coin.id,
      symbol: coin.symbol.toLowerCase(),
      name: coin.name,
      market_cap: coin.market_cap || 0
    }));
  } catch (error) {
    // Handle potential errors
    if (error instanceof Error) {
      if (error instanceof SyntaxError) {
        throw new Error('Invalid JSON format in crypto-prices.json');
      }
      if ('code' in error && (error as NodeJS.ErrnoException).code === 'ENOENT') {
        throw new Error(`Coins data file not found at ${resolvedPath}`);
      }
    }
    throw error;
  }
}