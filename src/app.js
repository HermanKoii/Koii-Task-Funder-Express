const express = require('express');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

const app = express();

// Existing routes would be added here
// For now, we'll just demonstrate the error handling

// Not found routes middleware should be added AFTER all other routes
app.use(notFoundHandler);

// Global error handler
app.use(globalErrorHandler);

module.exports = app;