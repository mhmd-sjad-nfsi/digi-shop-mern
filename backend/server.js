import express from 'express';
import products from './data/products.js'; // این خط را می‌توانیم حذف کنیم
import productRoutes from './routes/productRoutes.js'; // ✨ روتر را ایمپورت می‌کنیم

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✨ مسیر اصلی API محصولات
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});