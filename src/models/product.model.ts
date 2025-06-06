import mongoose from 'mongoose';
import { IProduct, ProductCategory, BrandType } from '../types/product.types';

const ProductReviewSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  brand: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  category: { 
    type: String, 
    enum: Object.values(ProductCategory), 
    required: true 
  },
  brandType: { 
    type: String, 
    enum: Object.values(BrandType), 
    required: true 
  },
  ingredients: { 
    type: [String], 
    default: [] 
  },
  size: { 
    type: String, 
    required: true 
  },
  imageUrls: { 
    type: [String], 
    default: [] 
  },
  averageRating: { 
    type: Number, 
    default: 0, 
    min: 0, 
    max: 5 
  },
  reviews: { 
    type: [ProductReviewSchema], 
    default: [] 
  },
  inStock: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { 
  timestamps: true 
});

// Method to calculate average rating
ProductSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) return 0;
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((totalRating / this.reviews.length).toFixed(2));
};

// Middleware to update average rating before saving
ProductSchema.pre('save', function(next) {
  this.averageRating = this.calculateAverageRating();
  next();
});

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;