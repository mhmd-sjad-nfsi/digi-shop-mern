// frontend/src/redux/slices/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants';

// ✨ baseQuery را به این شکل کامل می‌کنیم
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // توکن را از auth state می‌خوانیم
    const { userInfo } = getState().auth;
    if (userInfo && userInfo.token) {
      headers.set('authorization', `Bearer ${userInfo.token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});