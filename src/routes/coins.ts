import { Request, Response } from 'express';
import cryptoPrices from '../data/crypto-prices.json';
import { transformCoinsList } from '../coins-list-transformer';

/**
 * Handles the GET request for retrieving the list of cryptocurrencies
 * @param req Express request object
 * @param res Express response object
 */
export const getCoinsList = (req: Request, res: Response) => {
  try {
    // Extract optional query parameters
    const { order = 'market_cap_desc', per_page = 100, page = 1 } = req.query;

    // Validate and parse pagination parameters
    const pageNum = Math.max(1, Number(page));
    const perPageNum = Math.min(Math.max(1, Number(per_page)), 250);
    const startIndex = (pageNum - 1) * perPageNum;
    const endIndex = startIndex + perPageNum;

    // Transform raw coin data
    const transformedCoins = transformCoinsList();

    // Sort coins based on market cap (descending by default)
    const sortedCoins = transformedCoins.sort((a, b) => {
      const coinA = cryptoPrices.find(coin => coin.id === a.id);
      const coinB = cryptoPrices.find(coin => coin.id === b.id);
      
      if (!coinA || !coinB) return 0;
      
      return order === 'market_cap_desc' 
        ? coinB.market_cap - coinA.market_cap 
        : coinA.market_cap - coinB.market_cap;
    });

    // Paginate the results
    const paginatedCoins = sortedCoins.slice(startIndex, endIndex);

    res.json(paginatedCoins);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Unable to retrieve coins list' 
    });
  }
};