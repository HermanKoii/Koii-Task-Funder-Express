function validateInput(req, res, next) {
  const { ids, vs_currencies } = req.query;

  if (!ids || !vs_currencies) {
    return res.status(400).json({
      error: 'Missing required parameters: ids, vs_currencies'
    });
  }

  next();
}

module.exports = { validateInput };