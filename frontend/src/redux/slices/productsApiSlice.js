// frontend/src/redux/slices/productsApiSlice.js
import { apiSlice } from './apiSlice';

const PRODUCTS_URL = '/api/products'; // برای خوانایی بهتر

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // تعریف اولین query: دریافت همه محصولات
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5, // داده‌ها را تا ۵ ثانیه در کش نگه می‌دارد
    }),
    // تعریف دومین query: دریافت جزئیات یک محصول
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// RTK Query به صورت خودکار برای ما هوک‌هایی بر اساس نام اندپوینت‌ها می‌سازد
export const { useGetProductsQuery, useGetProductDetailsQuery } = productsApiSlice;