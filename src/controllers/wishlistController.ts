import { Request, Response } from 'express';
import { Wishlist } from '../models/Wishlist';
import { ErrorResponse } from '../utils/errorResponse';

/**
 * Delete a product from the user's wishlist
 * @route DELETE /api/wishlist/products/:productId
 * @access Private
 */
export const deleteProductFromWishlist = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // From authentication middleware
    const { productId } = req.params;

    // Validate input
    if (!userId) {
      return res.status(401).json(new ErrorResponse('User not authenticated', 401));
    }

    if (!productId) {
      return res.status(400).json(new ErrorResponse('Product ID is required', 400));
    }

    // Find and update the wishlist
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json(new ErrorResponse('Wishlist not found', 404));
    }

    // Remove the specific product from wishlist
    wishlist.items = wishlist.items.filter(item => item.productId !== productId);

    // Save the updated wishlist
    await wishlist.save();

    res.status(200).json({
      success: true,
      message: 'Product removed from wishlist',
      data: wishlist
    });
  } catch (error) {
    console.error('Delete Wishlist Product Error:', error);
    res.status(500).json(new ErrorResponse('Server error while removing product from wishlist', 500));
  }
};