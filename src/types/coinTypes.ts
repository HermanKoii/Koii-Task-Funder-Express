/**
 * Represents the basic structure of a cryptocurrency coin
 */
export interface CoinData {
  id: string;         // Unique identifier for the coin
  symbol: string;     // Short symbol representation (e.g., 'btc')
  name: string;       // Full name of the cryptocurrency
}

/**
 * Optional pagination parameters for coins list retrieval
 */
export interface PaginationOptions {
  page?: number;      // Page number for pagination
  perPage?: number;   // Number of items per page
}