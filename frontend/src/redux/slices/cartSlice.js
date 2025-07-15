// frontend/src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // آرایه‌ای برای نگهداری محصولات در سبد
  // در آینده موارد دیگری مثل آدرس ارسال و روش پرداخت هم اینجا اضافه میشه
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // اینجا Reducer های ما قرار می‌گیرند
    addToCart: (state, action) => {
      const item = action.payload; // آیتمی که قرار است به سبد اضافه شود

      // چک می‌کنیم آیا این آیتم از قبل در سبد وجود دارد یا نه
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // اگر وجود داشت، آیتم موجود را با آیتم جدید جایگزین می‌کنیم
        // این کار برای به‌روزرسانی تعداد محصول مفید است
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        // اگر وجود نداشت، آیتم جدید را به انتهای آرایه اضافه می‌کنیم
        state.cartItems.push(item);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;