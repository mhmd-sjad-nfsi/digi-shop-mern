import express from 'express';
import {
  registerUser,
  authUser,
  logoutUser,
  getUserProfile, // ✨
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // ✨

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile); // ✨ مسیر جدید و محافظت‌شده

export default router;