import mongoose from 'mongoose';

beforeAll(async () => {
  // Use an in-memory MongoDB server for testing
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
});