import express from 'express';
import dotenv from 'dotenv';
import path from 'path'; // ✨
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'; // ✨ ایمپورت مسیرهای کاربر
import orderRoutes from './routes/orderRoutes.js'; // ✨ ایمپورت مسیرهای سفارش
import uploadRoutes from './routes/uploadRoutes.js'; // ✨ ایمپورت مسیر آپلود 


dotenv.config();
connectDB();

const app = express();

// ✨ میان‌افزار برای解析 کردن بدنه درخواست به صورت JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes); // ✨ اتصال مسیرهای کاربر
app.use('/api/orders', orderRoutes); // ✨
app.use('/api/upload', uploadRoutes); // ✨



const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});