// frontend/src/redux/slices/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



// آدرس پایه API ما که در پراکسی Vite تعریف کردیم
const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'], // برای مدیریت کش در آینده
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}), // اندپوینت‌ها اینجا تزریق خواهند شد
});