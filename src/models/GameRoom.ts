import mongoose from 'mongoose';

const GameRoomSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  status: { 
    type: String, 
    enum: ['pending', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  }
  // Add other necessary fields as needed
});

export const GameRoom = mongoose.model('GameRoom', GameRoomSchema);

export default GameRoom;