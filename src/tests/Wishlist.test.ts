import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Wishlist, { IWishlist } from '../models/Wishlist';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Wishlist Model Test', () => {
  it('should create a wishlist with valid data', async () => {
    const userId = new mongoose.Types.ObjectId();
    const productId = new mongoose.Types.ObjectId();

    const wishlistData: Partial<IWishlist> = {
      user: userId,
      products: [productId],
      name: 'Summer Favorites'
    };

    const wishlist = new Wishlist(wishlistData);
    const savedWishlist = await wishlist.save();

    expect(savedWishlist.user).toEqual(userId);
    expect(savedWishlist.products).toHaveLength(1);
    expect(savedWishlist.name).toBe('Summer Favorites');
    expect(savedWishlist.createdAt).toBeDefined();
    expect(savedWishlist.updatedAt).toBeDefined();
  });

  it('should use default name if no name provided', async () => {
    const userId = new mongoose.Types.ObjectId();

    const wishlistData: Partial<IWishlist> = {
      user: userId,
      products: []
    };

    const wishlist = new Wishlist(wishlistData);
    const savedWishlist = await wishlist.save();

    expect(savedWishlist.name).toBe('My Wishlist');
  });

  it('should prevent creating multiple wishlists for same user', async () => {
    const userId = new mongoose.Types.ObjectId();

    const wishlist1 = new Wishlist({ user: userId });
    await wishlist1.save();

    const wishlist2 = new Wishlist({ user: userId });

    await expect(wishlist2.save()).rejects.toThrow();
  });

  it('should validate name length', async () => {
    const userId = new mongoose.Types.ObjectId();
    const longName = 'A'.repeat(101);

    const wishlistData: Partial<IWishlist> = {
      user: userId,
      name: longName
    };

    const wishlist = new Wishlist(wishlistData);

    await expect(wishlist.validate()).rejects.toThrow();
  });
});