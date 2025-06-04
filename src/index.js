const express = require('express');
const { body, query, validationResult } = require('express-validator');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Mock coin list data
const mockCoinList = [
  { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin' },
  { id: 'ethereum', symbol: 'eth', name: 'Ethereum' },
  { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin' }
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: {
        error: 'Bad Request',
        code: 400,
        message: 'Invalid input parameters'
      },
      errors: errors.array()
    });
  }
  next();
};

// Coin List Endpoint with Input Validation
app.get('/coins/list', [
  // Validate query parameters
  query('include_platform')
    .optional()
    .isBoolean()
    .withMessage('include_platform must be a boolean'),
  
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('per_page')
    .optional()
    .isInt({ min: 1, max: 250 })
    .withMessage('Per page must be between 1 and 250'),

  // Error handling middleware
  handleValidationErrors
], (req, res) => {
  try {
    const { page = 1, per_page = 100, include_platform = false } = req.query;

    // Simulate pagination
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + parseInt(per_page);
    const paginatedCoins = mockCoinList.slice(startIndex, endIndex);

    // If include_platform is true, add a dummy platform object
    const processedCoins = include_platform 
      ? paginatedCoins.map(coin => ({
          ...coin,
          platforms: { 
            ethereum: `0x${coin.id.slice(0, 40)}` // Simulated platform address
          }
        }))
      : paginatedCoins;

    res.json(processedCoins);
  } catch (error) {
    res.status(500).json({
      status: {
        error: 'Internal Server Error',
        code: 500,
        message: 'An unexpected error occurred'
      }
    });
  }
});

// Error handler for non-existent routes
app.use((req, res) => {
  res.status(404).json({
    status: {
      error: 'Not Found',
      code: 404,
      message: 'The requested endpoint does not exist'
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Mock CoinGecko API listening on port ${port}`);
});

module.exports = app; // For testing purposes