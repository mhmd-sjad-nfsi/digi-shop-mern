import { apiSlice } from './apiSlice';
import { ORDERS_URL } from '../../constants'; 

export const ordersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: 'POST',
        body: { ...order },
      }),
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`,
      }),
      keepUnusedDataFor: 5, // داده را تا ۵ ثانیه در کش نگه می‌دارد
    }),
    // ✨ Mutation جدید برای پرداخت سفارش
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        body: { ...details },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation } = ordersApiSlice;