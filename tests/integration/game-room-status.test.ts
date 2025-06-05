import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../src/app';
import { GameRoom } from '../../src/models/game-room.model';
import mongoose from 'mongoose';

describe('Game Room Status Update Endpoint', () => {
  let testRoom: any;
  let roomId: string;

  beforeEach(async () => {
    // Clear the database before each test
    await GameRoom.deleteMany({});

    // Create a test room
    testRoom = new GameRoom({
      name: 'Test Room',
      creator: 'test-user',
      status: 'waiting',
      maxPlayers: 4,
      players: ['test-user']
    });
    await testRoom.save();
    roomId = testRoom._id.toString();
  });

  afterAll(async () => {
    // Close mongoose connection after tests
    await mongoose.connection.close();
  });

  it('should successfully update room status', async () => {
    const response = await request(app)
      .patch(`/api/game-rooms/${roomId}/status`)
      .send({ 
        status: 'in-progress', 
        userId: 'test-user' 
      })
      .expect(200);

    expect(response.body.status).toBe('in-progress');
  });

  it('should return 400 for invalid status', async () => {
    const response = await request(app)
      .patch(`/api/game-rooms/${roomId}/status`)
      .send({ 
        status: 'invalid-status', 
        userId: 'test-user' 
      })
      .expect(400);

    expect(response.body.message).toContain('Invalid status');
  });

  it('should return 403 if user is not room creator', async () => {
    const response = await request(app)
      .patch(`/api/game-rooms/${roomId}/status`)
      .send({ 
        status: 'in-progress', 
        userId: 'unauthorized-user' 
      })
      .expect(403);

    expect(response.body.message).toContain('Not authorized');
  });

  it('should return 404 for non-existent room', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .patch(`/api/game-rooms/${fakeId}/status`)
      .send({ 
        status: 'in-progress', 
        userId: 'test-user' 
      })
      .expect(404);

    expect(response.body.message).toContain('Room not found');
  });

  it('should handle invalid room ID format', async () => {
    const response = await request(app)
      .patch('/api/game-rooms/invalid-id/status')
      .send({ 
        status: 'in-progress', 
        userId: 'test-user' 
      })
      .expect(400);

    expect(response.body.message).toContain('Invalid room ID');
  });
});