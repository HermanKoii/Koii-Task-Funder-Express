const express = require('express');
const healthCheck = require('./routes/healthCheck');

const app = express();

// Health check endpoint
app.get('/health', healthCheck);

module.exports = app;