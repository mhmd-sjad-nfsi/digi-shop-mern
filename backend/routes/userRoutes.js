import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';

const router = express.Router();
router.route('/').post(registerUser);
router.route('/login').post(authUser); // ✨ مسیر login را اضافه کنید

export default router;