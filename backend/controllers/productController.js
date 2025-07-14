// backend/controllers/productController.js
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js'; // ✨ مدل Product را ایمپورت می‌کنیم

// @desc    دریافت همه محصولات
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // ✨ به جای خواندن از فایل، از دیتابیس می‌خوانیم
  res.json(products);
});

// @desc    دریافت یک محصول با آیدی
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id); // ✨ با استفاده از ID از دیتابیس می‌خوانیم

  if (product) {
    res.json(product);
  } else {
    // ✨ اگر محصولی پیدا نشد، میان‌افزار خطا فعال می‌شود
    res.status(404);
    throw new Error('محصول مورد نظر یافت نشد');
  }
});

export { getProducts, getProductById };