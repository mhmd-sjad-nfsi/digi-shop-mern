// frontend/src/redux/slices/productsApiSlice.js
import { apiSlice } from './apiSlice';
import { PRODUCTS_URL } from '../../constants'; // ✨ فایل constants را بعدا می‌سازیم
import { UPLOAD_URL } from '../../constants'; // ✨



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
   createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Product'], // برای رفرش کردن لیست پس از ایجاد
    }),
    
    // ✨ Mutation جدید برای حذف محصول
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'], // ✨ کش لیست محصولات را باطل می‌کند
    }),
    // ✨ Mutation جدید برای آپلود تصویر
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation, // ✨
  useDeleteProductMutation, // ✨
  useUpdateProductMutation, // ✨
  useUploadProductImageMutation, // ✨
} = productsApiSlice;