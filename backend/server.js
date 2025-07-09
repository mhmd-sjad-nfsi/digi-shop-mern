import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // ایمپورت تابع اتصال

dotenv.config(); // برای خواندن فایل .env

connectDB(); // فراخوانی تابع اتصال به دیتابیس

const app = express();

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});