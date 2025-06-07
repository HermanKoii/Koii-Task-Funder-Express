// Mock environment variables
process.env.SIGNING_SECRET = 'test_signing_secret';
process.env.funder_keypair = JSON.stringify([1, 2, 3]);
process.env.NODE_ENV = 'test';