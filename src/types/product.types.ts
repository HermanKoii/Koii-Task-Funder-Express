import { Document } from 'mongoose';

export enum ProductCategory {
  MAKEUP = 'Makeup',
  SKINCARE = 'Skincare',
  HAIRCARE = 'Haircare',
  FRAGRANCE = 'Fragrance',
  TOOLS = 'Tools',
  BATH_AND_BODY = 'Bath and Body'
}

export enum BrandType {
  LUXURY = 'Luxury',
  DRUGSTORE = 'Drugstore',
  INDIE = 'Indie'
}

export interface ProductReview {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface IProduct extends Document {
  name: string;
  brand: string;
  description: string;
  price: number;
  category: ProductCategory;
  brandType: BrandType;
  ingredients: string[];
  size: string;
  imageUrls: string[];
  averageRating: number;
  reviews: ProductReview[];
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}