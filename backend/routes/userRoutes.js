import express from 'express';
import { registerUser, authUser } from '../controllers/userController.js';
import { logoutUser } from '../controllers/userController.js'; // ✨ افزودن logoutUser

const router = express.Router();
router.route('/').post(registerUser);
router.route('/login').post(authUser); // ✨ مسیر login را اضافه کنید
router.route('/logout').post(logoutUser); // ✨ افزودن مسیر خروج


export default router;