/**
 * Represents the detailed structure of a cryptocurrency coin
 */
export interface CoinData {
  id: string;             // Unique identifier for the coin
  symbol: string;         // Short symbol representation (e.g., 'btc')
  name: string;           // Full name of the cryptocurrency
  description?: string;   // Optional detailed description
  price?: number;         // Optional current price
  marketCap?: number;     // Optional market capitalization
}

/**
 * Optional pagination parameters for coins list retrieval
 */
export interface PaginationOptions {
  page?: number;          // Page number for pagination
  perPage?: number;       // Number of items per page
  sortBy?: string;        // Optional sorting field
  sortOrder?: 'asc' | 'desc'; // Optional sorting direction
}

/**
 * Represents error responses in the API
 */
export interface ApiErrorResponse {
  error: string;          // Error type
  message: string;        // Detailed error message
  status: number;         // HTTP status code
}