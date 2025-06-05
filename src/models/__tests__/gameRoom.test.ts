import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import { GameRoom, IGameRoom, IPlayer } from '../gameRoom';

describe('GameRoom Model', () => {
  // Temporary in-memory MongoDB connection
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
  });

  const createTestRoom = (maxPlayers = 4): IGameRoom => {
    return new GameRoom({
      roomId: 'test-room-1',
      name: 'Test Game Room',
      creatorId: 'creator-123',
      maxPlayers: maxPlayers,
      players: []
    });
  };

  const createTestPlayer = (userId = 'player-1'): IPlayer => ({
    userId,
    username: `Player ${userId}`,
    joinedAt: new Date()
  });

  it('should create a game room', () => {
    const room = createTestRoom();
    expect(room).toBeTruthy();
    expect(room.status).toBe('open');
    expect(room.players.length).toBe(0);
  });

  it('should add a player to the room', async () => {
    const room = createTestRoom();
    const player = createTestPlayer();

    await room.addPlayer(player);
    
    expect(room.players.length).toBe(1);
    expect(room.players[0].userId).toBe(player.userId);
  });

  it('should prevent adding a player to a full room', async () => {
    const room = createTestRoom(2);
    const player1 = createTestPlayer('player-1');
    const player2 = createTestPlayer('player-2');
    const player3 = createTestPlayer('player-3');

    await room.addPlayer(player1);
    await room.addPlayer(player2);

    await expect(room.addPlayer(player3)).rejects.toThrow('Cannot join room: Room is full or closed');
  });

  it('should remove a player from the room', async () => {
    const room = createTestRoom();
    const player = createTestPlayer();

    await room.addPlayer(player);
    await room.removePlayer(player.userId);

    expect(room.players.length).toBe(0);
    expect(room.status).toBe('closed');
  });

  it('should prevent removing a non-existent player', async () => {
    const room = createTestRoom();

    await expect(room.removePlayer('non-existent-player')).rejects.toThrow('Player not found in room');
  });

  it('should change room status when players are added/removed', async () => {
    const room = createTestRoom(3);
    const player1 = createTestPlayer('player-1');
    const player2 = createTestPlayer('player-2');
    const player3 = createTestPlayer('player-3');

    await room.addPlayer(player1);
    await room.addPlayer(player2);
    expect(room.status).toBe('open');

    await room.addPlayer(player3);
    expect(room.status).toBe('in_progress');

    await room.removePlayer(player3.userId);
    expect(room.status).toBe('open');
  });
});