// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // توکن را از هدر Authorization می‌خوانیم
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // توکن را از 'Bearer token' جدا می‌کنیم
      token = req.headers.authorization.split(' ')[1];

      // توکن را اعتبارسنجی می‌کنیم
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // اطلاعات کاربر را (بدون پسورد) پیدا کرده و به آبجکت req اضافه می‌کنیم
      req.user = await User.findById(decoded.id).select('-password');

      next(); // به کنترلر بعدی برو
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // اگر کاربر ادمین بود، به مرحله بعد برو
  } else {
    res.status(401); // Unauthorized
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };

