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
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'محصول با موفقیت حذف شد' });
  } else {
    res.status(404);
    throw new Error('محصول یافت نشد');
  }
});
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('محصول یافت نشد');
  }
});
export { getProducts, getProductById , createProduct, deleteProduct, updateProduct };