// backend/models/userModel.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // ✨ ایمپورت bcrypt

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

// ✨ یک middleware که قبل از ذخیره شدن کاربر اجرا می‌شود
userSchema.pre('save', async function (next) {
  // فقط اگر پسورد تغییر کرده بود (یا کاربر جدید بود)، دوباره آن را هش کن
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
export default User;