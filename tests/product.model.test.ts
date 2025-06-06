import { describe, it, expect, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import Product from '../src/models/product.model';
import { ProductCategory, BrandType } from '../src/types/product.types';

describe('Product Model', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/sephora_test');
  });

  it('should create a new product', async () => {
    const productData = {
      name: 'Ultra Moisturizing Cream',
      brand: 'Sephora Collection',
      description: 'A luxurious cream for deep hydration',
      price: 45.99,
      category: ProductCategory.SKINCARE,
      brandType: BrandType.LUXURY,
      ingredients: ['Hyaluronic Acid', 'Ceramides'],
      size: '50ml',
      imageUrls: ['https://example.com/product.jpg'],
      inStock: true
    };

    const product = new Product(productData);
    const savedProduct = await product.save();

    expect(savedProduct.name).toBe(productData.name);
    expect(savedProduct.price).toBe(productData.price);
    expect(savedProduct.category).toBe(ProductCategory.SKINCARE);
  });

  it('should validate required fields', async () => {
    const invalidProduct = new Product({});

    await expect(invalidProduct.validate()).rejects.toThrow();
  });

  it('should calculate average rating', async () => {
    const product = new Product({
      name: 'Test Product',
      brand: 'Test Brand',
      description: 'Test Description',
      price: 29.99,
      category: ProductCategory.MAKEUP,
      brandType: BrandType.DRUGSTORE,
      size: '30ml'
    });

    product.reviews = [
      { userId: '1', rating: 4, comment: 'Good product', createdAt: new Date() },
      { userId: '2', rating: 5, comment: 'Excellent', createdAt: new Date() }
    ];

    await product.save();
    expect(product.averageRating).toBe(4.5);
  });
});