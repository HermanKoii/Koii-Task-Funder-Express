import { Request, Response, NextFunction } from 'express';
import { verifyRoomCreator } from '../../src/middleware/roomCreatorAuth';
import { GameRoom } from '../../src/models/GameRoom';

jest.mock('../../src/models/GameRoom');

describe('Room Creator Authentication Middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    mockReq = {
      params: { roomId: 'room123' },
      user: { id: 'user123' }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    mockNext = jest.fn();

    (GameRoom.findById as jest.Mock).mockClear();
  });

  it('should allow access for room creator', async () => {
    const mockRoom = { _id: 'room123', creatorId: 'user123' };
    (GameRoom.findById as jest.Mock).mockResolvedValue(mockRoom);

    await verifyRoomCreator(
      mockReq as Request, 
      mockRes as Response, 
      mockNext
    );

    expect(GameRoom.findById).toHaveBeenCalledWith('room123');
    expect(mockNext).toHaveBeenCalled();
  });

  it('should deny access for non-room creator', async () => {
    const mockRoom = { _id: 'room123', creatorId: 'otherUser' };
    (GameRoom.findById as jest.Mock).mockResolvedValue(mockRoom);

    await verifyRoomCreator(
      mockReq as Request, 
      mockRes as Response, 
      mockNext
    );

    expect(GameRoom.findById).toHaveBeenCalledWith('room123');
    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.any(String) })
    );
  });
});