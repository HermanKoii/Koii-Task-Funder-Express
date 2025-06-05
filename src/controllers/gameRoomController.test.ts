import { Request, Response, NextFunction } from 'express';
import { updateGameRoomStatus } from './gameRoomController';
import GameRoom from '../models/GameRoom';

jest.mock('../models/GameRoom');

describe('updateGameRoomStatus', () => {
  let mockReq: Request;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {
      params: { roomId: 'room123' },
      body: { status: 'in_progress' },
      user: { id: 'user123' }
    } as Request;

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    mockNext = jest.fn();

    (GameRoom.findOneAndUpdate as jest.Mock).mockClear();
  });

  it('should update room status successfully', async () => {
    const mockRoom = { _id: 'room123', status: 'in_progress', creatorId: 'user123' };
    (GameRoom.findOneAndUpdate as jest.Mock).mockResolvedValue(mockRoom);

    await updateGameRoomStatus(
      mockReq, 
      mockRes as Response, 
      mockNext
    );

    expect(GameRoom.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: 'room123', creatorId: 'user123' },
      { status: 'in_progress' },
      { new: true, runValidators: true }
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Room status updated successfully',
        room: mockRoom
      })
    );
  });
});