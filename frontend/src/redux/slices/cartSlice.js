// frontend/src/redux/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      // ✨ چک می‌کنیم آیا این محصول (بر اساس _id) از قبل در سبد وجود دارد یا نه
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        // اگر وجود داشت، آیتم موجود را با آیتم جدید (که حاوی qty جدید است) جایگزین می‌کنیم
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