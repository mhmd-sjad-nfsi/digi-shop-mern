// backend/routes/productRoutes.js
import express from 'express';
// ✨ getProductById را هم از کنترلر ایمپورت می‌کنیم
import { getProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

// ✨ برای خوانایی بهتر از متد .route() استفاده می‌کنیم
router.route('/').get(getProducts);
router.route('/:id').get(getProductById); // ✨ این خط جدید مسیر را برای یک محصول تعریف می‌کند

export default router;