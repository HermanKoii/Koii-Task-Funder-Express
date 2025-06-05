import mongoose from 'mongoose';

const gameRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['waiting', 'in-progress', 'completed'], 
    default: 'waiting' 
  },
  maxPlayers: { type: Number, required: true },
  players: [{ type: String }]
}, { timestamps: true });

export const GameRoom = mongoose.model('GameRoom', gameRoomSchema);