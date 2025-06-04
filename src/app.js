import express from 'express';
import { 
  notFoundHandler, 
  methodNotAllowedHandler, 
  errorHandler 
} from './middleware/errorHandler.js';

const app = express();

// Apply any existing routes here
// For example: app.use('/coins', coinRoutes);

// Method Not Allowed handler for all routes
app.all('*', methodNotAllowedHandler);

// 404 Not Found handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;