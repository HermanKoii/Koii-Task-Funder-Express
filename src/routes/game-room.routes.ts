import express from 'express';
import { GameRoom } from '../models/game-room.model';
import mongoose from 'mongoose';

const router = express.Router();

router.patch('/:roomId/status', async (req, res) => {
  try {
    const { roomId } = req.params;
    const { status, userId } = req.body;

    // Validate room ID format
    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: 'Invalid room ID' });
    }

    // Find the room
    const room = await GameRoom.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if user is the creator
    if (room.creator !== userId) {
      return res.status(403).json({ message: 'Not authorized to update room status' });
    }

    // Validate status
    const validStatuses = ['waiting', 'in-progress', 'completed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    // Update room status
    room.status = status;
    await room.save();

    res.status(200).json(room);
  } catch (error) {
    console.error('Error updating room status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;