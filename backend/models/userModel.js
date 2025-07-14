// backend/models/userModel.js
import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // هر کاربر باید ایمیل منحصربه‌فردی داشته باشد
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false, // به طور پیش‌فرض، کاربران ادمین نیستند
    },
  },
  {
    timestamps: true, // به صورت خودکار فیلدهای createdAt و updatedAt را اضافه می‌کند
  }
);

const User = mongoose.model('User', userSchema);

export default User;