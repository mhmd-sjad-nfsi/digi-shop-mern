import express from 'express';
import dotenv from 'dotenv'; // ✨ ایمپورت dotenv
dotenv.config(); // ✨ پیکربندی dotenv

import productRoutes from './routes/productRoutes.js';

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);

// ✨ حالا از متغیر محیطی که در فایل .env تعریف شده استفاده می‌کنیم
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});