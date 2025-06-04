/**
 * Health check route handler
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
const healthCheck = (req, res) => {
  try {
    res.status(200).json({
      status: 'ok',
      message: 'CoinGecko Mock API is healthy and running',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error during health check',
    });
  }
};

module.exports = healthCheck;