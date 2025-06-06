import express from 'express';
import { deleteProductFromWishlist } from '../controllers/wishlistController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// DELETE endpoint to remove a product from wishlist
router.delete('/products/:productId', authenticateUser, deleteProductFromWishlist);

export default router;