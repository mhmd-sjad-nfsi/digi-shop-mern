// frontend/src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice'; // ✨ ایمپورت apiSlice
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';


const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // ✨ افزودن reducer مربوط به apiSlice
    cart: cartReducer,
    auth: authReducer,
  },
  // ✨ افزودن middleware مخصوص RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // فعال کردن Redux DevTools
});

export default store;