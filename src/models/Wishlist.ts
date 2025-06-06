import mongoose, { Schema, Document } from 'mongoose';

// Interface representing a Wishlist document
export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId;
  products: mongoose.Types.ObjectId[];
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Wishlist Schema
const WishlistSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: []
  }],
  name: {
    type: String,
    default: 'My Wishlist',
    trim: true,
    maxlength: 100
  }
}, {
  timestamps: true,
  collection: 'wishlists'
});

// Validation to ensure unique wishlist per user
WishlistSchema.index({ user: 1 }, { unique: true });

// Compile and export the model
export const Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default Wishlist;