import express from 'express';
import coinDetailsRouter from './src/routes/coinDetails.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());

// Routes
app.use('/coins', coinDetailsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    message: err.message
  });
});

// Start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;