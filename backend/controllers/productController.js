import products from '../data/products.js';

// @desc    دریافت همه محصولات
// @route   GET /api/products
// @access  Public
const getProducts = (req, res) => {
  res.json(products);
};

export { getProducts };