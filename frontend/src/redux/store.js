import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice'; // ✨ ایمپورت ردیوسر جدید

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer, // ✨ افزودن ردیوسر احراز هویت
  },
});

export default store;