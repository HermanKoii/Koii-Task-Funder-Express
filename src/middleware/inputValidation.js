export function validateCoinPriceParams(req, res, next) {
  const { ids, vs_currencies } = req.query;

  if (!ids) {
    return res.status(400).json({ error: 'Coin ids are required' });
  }

  if (!vs_currencies) {
    return res.status(400).json({ error: 'Versus currencies are required' });
  }

  next();
}

export function validateCoinListParams(req, res, next) {
  // Add validation logic for coin list parameters if needed
  next();
}

export function validateCoin(coinId) {
  const validCoins = ['bitcoin', 'ethereum'];
  return validCoins.includes(coinId);
}