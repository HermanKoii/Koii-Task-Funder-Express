import mongoose, { Schema, Document } from 'mongoose';

// Player subdocument schema
export interface IPlayer {
  userId: string;
  username: string;
  joinedAt: Date;
}

// Game Room interface
export interface IGameRoom extends Document {
  roomId: string;
  name: string;
  creatorId: string;
  players: IPlayer[];
  maxPlayers: number;
  status: 'open' | 'in_progress' | 'closed';
  
  // Method to add a player to the room
  addPlayer(player: IPlayer): Promise<IGameRoom>;
  
  // Method to remove a player from the room
  removePlayer(userId: string): Promise<IGameRoom>;
}

// Game Room Schema
const GameRoomSchema: Schema<IGameRoom> = new Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  creatorId: {
    type: String,
    required: true
  },
  players: [{
    userId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  maxPlayers: {
    type: Number,
    required: true,
    min: [2, 'Room must support at least 2 players'],
    max: [10, 'Room cannot exceed 10 players']
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'closed'],
    default: 'open'
  }
}, {
  timestamps: true
});

// Method to add a player to the room
GameRoomSchema.methods.addPlayer = async function(player: IPlayer) {
  // Check if room is full or closed
  if (this.players.length >= this.maxPlayers || this.status !== 'open') {
    throw new Error('Cannot join room: Room is full or closed');
  }

  // Check if player already exists
  const playerExists = this.players.some(p => p.userId === player.userId);
  if (playerExists) {
    throw new Error('Player is already in the room');
  }

  // Add player
  this.players.push(player);

  // Update status if room is now full
  if (this.players.length === this.maxPlayers) {
    this.status = 'in_progress';
  }

  return this.save();
};

// Method to remove a player from the room
GameRoomSchema.methods.removePlayer = async function(userId: string) {
  // Find player index
  const playerIndex = this.players.findIndex(p => p.userId === userId);
  
  // If player not found, throw error
  if (playerIndex === -1) {
    throw new Error('Player not found in room');
  }

  // Remove player
  this.players.splice(playerIndex, 1);

  // If room is now empty, close it
  if (this.players.length === 0) {
    this.status = 'closed';
  } 
  // If room was full and now has space, reopen it
  else if (this.status === 'in_progress' && this.players.length < this.maxPlayers) {
    this.status = 'open';
  }

  return this.save();
};

export const GameRoom = mongoose.model<IGameRoom>('GameRoom', GameRoomSchema);