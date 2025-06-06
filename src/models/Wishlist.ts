import mongoose, { Schema, Document } from 'mongoose';

export interface IWishlistItem {
  productId: string;
  addedAt: Date;
}

export interface IWishlist extends Document {
  userId: string;
  items: IWishlistItem[];
}

const WishlistSchema: Schema = new Schema({
  userId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  items: [{
    productId: { 
      type: String, 
      required: true 
    },
    addedAt: { 
      type: Date, 
      default: Date.now 
    }
  }]
});

export const Wishlist = mongoose.model<IWishlist>('Wishlist', WishlistSchema);