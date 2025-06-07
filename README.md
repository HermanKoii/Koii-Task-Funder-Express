# Cryptocurrency Market Data API

## Project Overview
A TypeScript-based Express API for retrieving cryptocurrency market data with robust error handling and pagination.

## Key Features
- Paginated cryptocurrency list retrieval
- Market cap-based sorting
- Comprehensive error handling
- Flexible data transformation

## Architecture
- Express.js routing
- TypeScript type safety
- JSON data transformation
- Vitest for testing

## Getting Started
1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. Start server: `npm start`

## Endpoints
- `GET /coins/markets`: Retrieve cryptocurrency market data
  - Query Parameters:
    - `order`: Sorting order (default: 'market_cap_desc')
    - `per_page`: Results per page (1-250, default: 100)
    - `page`: Page number (default: 1)

## Error Handling
- Validates input parameters
- Provides meaningful error responses
- Handles file read and parsing errors

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push and create a pull request

## License
MIT License