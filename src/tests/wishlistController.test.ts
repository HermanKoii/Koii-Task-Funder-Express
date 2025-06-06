import { describe, it, expect, beforeEach, vi } from 'vitest';
import { deleteProductFromWishlist } from '../controllers/wishlistController';
import { Wishlist } from '../models/Wishlist';

// Mock the entire Mongoose model
vi.mock('../models/Wishlist', () => ({
  Wishlist: {
    findOne: vi.fn(),
  }
}));

describe('Wishlist Controller - Delete Product', () => {
  const mockReq: any = {
    user: { id: 'user123' },
    params: { productId: 'product456' }
  };

  const mockRes: any = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully remove a product from wishlist', async () => {
    const mockWishlist = {
      userId: 'user123',
      items: [
        { productId: 'product456', addedAt: new Date() },
        { productId: 'product789', addedAt: new Date() }
      ],
      save: vi.fn()
    };

    vi.mocked(Wishlist.findOne).mockResolvedValue(mockWishlist as any);

    await deleteProductFromWishlist(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      success: true,
      message: 'Product removed from wishlist'
    }));
    expect(mockWishlist.items).toHaveLength(1);
    expect(mockWishlist.items[0].productId).toBe('product789');
  });

  it('should return 404 if wishlist not found', async () => {
    vi.mocked(Wishlist.findOne).mockResolvedValue(null);

    await deleteProductFromWishlist(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Wishlist not found'
    }));
  });

  it('should return 401 if user not authenticated', async () => {
    const invalidReq: any = {
      user: null,
      params: { productId: 'product456' }
    };

    await deleteProductFromWishlist(invalidReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({
      message: 'User not authenticated'
    }));
  });
});