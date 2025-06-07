function inputValidation(req, res, next) {
  const { taskId, amount } = req.body;

  // Basic validation
  if (!taskId || typeof taskId !== 'string' || taskId.trim() === '') {
    return res.status(400).json({ 
      error: 'Invalid task ID' 
    });
  }

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ 
      error: 'Invalid funding amount' 
    });
  }

  next();
}

module.exports = inputValidation;