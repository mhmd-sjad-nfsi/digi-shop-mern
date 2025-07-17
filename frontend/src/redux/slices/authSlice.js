// frontend/src/redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// اطلاعات کاربر را از localStorage می‌خوانیم
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userInfo: userInfoFromStorage, // حالت اولیه بر اساس localStorage
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // اکشن‌های همزمان مثل logout در جلسات آینده اینجا اضافه می‌شوند
  },
  extraReducers: (builder) => {
    // منطق مربوط به thunkهای login و register در جلسات آینده اینجا اضافه می‌شود
  },
});

export default authSlice.reducer;