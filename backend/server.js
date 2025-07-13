// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { notFound, errorHandler } from './middleware/errorMiddleware.js'; // ✨ ایمپورت میان‌افزارها
import productRoutes from './routes/productRoutes.js';

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);

// ✨ میان‌افزار 404 باید بعد از تمام مسیرها قرار بگیرد
app.use(notFound);

// ✨ میان‌افزار مدیریت خطا باید در آخرین مرحله استفاده شود
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});