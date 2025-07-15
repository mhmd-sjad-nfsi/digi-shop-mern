// frontend/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import cartReducer from './slices/cartSlice'; // ✨ ایمپورت ردیوسر سبد خرید

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer, // ✨ افزودن ردیوسر سبد خرید به آبجکت
  },
});

export default store;