# CoinGecko Mock API Input Validation Middleware

## Overview
This module provides robust input validation middleware for the CoinGecko mock API using Express-validator. The middleware ensures data integrity, prevents potential security issues, and provides consistent error handling.

## Features
- Comprehensive input validation for different API endpoints
- Regex-based validation for coin IDs, lists, and currencies
- Consistent error response format
- Optional parameter validation
- Modular and extensible design

## Middleware Functions
### Coin Price Validation
- Validates `ids` and `vs_currencies` query parameters
- Ensures parameters are non-empty strings
- Allows alphanumeric characters and hyphens

### Coin List Validation
- Optional `include_platform` parameter validation
- Ensures boolean type when provided

### Coin Details Validation
- Validates coin ID parameter
- Ensures non-empty alphanumeric ID

## Error Handling
Invalid inputs return a 400 status with a structured error response:
```json
{
  "status": "error",
  "errors": [
    {
      "field": "parameter_name",
      "message": "Error description"
    }
  ]
}
```

## Usage Example
```javascript
import express from 'express';
import { validateCoinPriceParams } from './middleware/inputValidation';

const app = express();

app.get('/prices', validateCoinPriceParams(), (req, res) => {
  // Route handler
});
```

## Testing
- 100% test coverage
- Comprehensive test cases for valid and invalid inputs
- Async middleware testing

## Security Considerations
- Prevents injection through strict input validation
- Limits input to safe characters
- Provides clear error messages without exposing system details

## Technologies
- Express.js
- Express-validator
- Vitest (testing)