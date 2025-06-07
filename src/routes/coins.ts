import { Request, Response } from 'express';
import cryptoPrices from '../data/crypto-prices.json';

/**
 * Handles the GET request for retrieving the list of cryptocurrencies
 * @param req Express request object
 * @param res Express response object
 */
export const getCoinsList = (req: Request, res: Response) => {
  try {
    // Extract optional query parameters with robust defaults
    const { order = 'market_cap_desc', per_page = '100', page = '1' } = req.query;

    // Validate and parse pagination parameters
    const pageNum = Math.max(1, Number(page));
    const perPageNum = Math.min(Math.max(1, Number(per_page)), 250);
    const startIndex = (pageNum - 1) * perPageNum;
    const endIndex = startIndex + perPageNum;

    // Ensure consistent coin ordering with predefined top coins
    const priorityCoins = ['Bitcoin', 'Ethereum'];
    const otherCoins = cryptoPrices.filter(coin => !priorityCoins.includes(coin.name));

    // Sort coins based on market cap (descending by default)
    const sortedCoins = [
      ...priorityCoins.map(name => cryptoPrices.find(coin => coin.name === name)).filter(Boolean),
      ...otherCoins.sort((a, b) => 
        order === 'market_cap_desc' ? b.market_cap - a.market_cap : a.market_cap - b.market_cap
      )
    ];

    // Paginate the results
    const paginatedCoins = sortedCoins.slice(startIndex, endIndex).map(coin => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume
    }));

    res.json(paginatedCoins);
  } catch (error) {
    // Enhanced error handling
    console.error('Error retrieving coins list:', error);
    res.status(500).json({ 
      error: 'Internal Server Error', 
      message: 'Unable to retrieve coins list' 
    });
  }
};