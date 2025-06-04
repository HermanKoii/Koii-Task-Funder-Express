const request = require('supertest');
const express = require('express');
const coinDetailsRoute = require('../src/routes/coinDetails');
const validateCoinDetails = require('../src/middleware/coinDetailsValidation');

const app = express();
app.use(express.json());
app.use('/coins', coinDetailsRoute);

describe('Coin Details Validation', () => {
  // Test valid coin ID
  it('should return coin details for valid coin ID', async () => {
    const response = await request(app).get('/coins/bitcoin');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 'bitcoin');
  });

  // Test invalid coin IDs
  const invalidCoinIds = [
    '', // Empty string
    ' ', // Just whitespace
    'Bitcoin!', // Special characters
    'very-long-coin-id-that-exceeds-maximum-length-limit', // Too long
    '  spaces  ', // Whitespace
    '123#@!', // Special characters
  ];

  // Test all invalid coin IDs
  invalidCoinIds.forEach(invalidId => {
    it(`should return 400 for invalid coin ID: ${JSON.stringify(invalidId)}`, async () => {
      const response = await request(app).get(`/coins/${invalidId}`);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid coin ID');
    });
  });

  // Test non-existent coin
  it('should return 404 for non-existent coin', async () => {
    const response = await request(app).get('/coins/non-existent-coin');
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Coin not found');
  });
});