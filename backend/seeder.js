// backend/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import connectDB from './config/db.js';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // ابتدا تمام داده‌های قبلی را پاک می‌کنیم
    await Product.deleteMany();
    await User.deleteMany();

    // کاربران نمونه را در دیتابیس ایجاد می‌کنیم
    const createdUsers = await User.insertMany(users);

    // ادمین را به عنوان کاربر سازنده محصولات در نظر می‌گیریم
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // محصولات نمونه را در دیتابیس ایجاد می‌کنیم
    await Product.insertMany(sampleProducts);

    console.log('✅ Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    // تمام داده‌ها را پاک می‌کنیم
    await Product.deleteMany();
    await User.deleteMany();

    console.log('🗑️ Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// با استفاده از آرگومان‌های خط فرمان، تابع مورد نظر را اجرا می‌کنیم
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}