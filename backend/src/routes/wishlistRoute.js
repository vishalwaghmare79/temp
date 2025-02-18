import express from 'express';
import { requireSignIn } from '../middlewares/authMiddleware.js';
import { addWishlistController, getWishlistController, removeWishlistController } from '../controllers/wishlistController.js';
const router = express.Router();

router.post('/add-wishlist', requireSignIn, addWishlistController);

router.delete('/remove-wishlist/:wishlistId', requireSignIn, removeWishlistController);

router.get('/', requireSignIn, getWishlistController);

export const wishlistRoutes = router; 