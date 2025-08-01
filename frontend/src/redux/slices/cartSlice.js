// frontend/src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils"; // ✨ ایمپورت تابع کمکی

// ✨ حالت اولیه را از localStorage می‌خوانیم
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems.push(item);
      }
      // ✨ پس از هر تغییر، سبد خرید را به‌روزرسانی و ذخیره می‌کنیم
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      // ✨ پس از هر تغییر، سبد خرید را به‌روزرسانی و ذخیره می‌کنیم
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state); // برای ذخیره کل سبد در localStorage
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state); // برای به‌روزرسانی قیمت‌ها و localStorage
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod,clearCartItems } =
  cartSlice.actions;

export default cartSlice.reducer;
