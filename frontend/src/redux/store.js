// frontend/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice'; // ✨ ایمپورت ردیوسر جدید

const store = configureStore({
  reducer: {
    products: productsReducer, // ✨ افزودن ردیوسر به آبجکت
  },
});

export default store;