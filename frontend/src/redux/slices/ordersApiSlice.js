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
     payOrder: builder.mutation({
      query: (orderId) => ({ // ✨ فقط orderId را دریافت می‌کند
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: 'PUT',
        // ✨ بدنه درخواست خالی است
      }),
    }),
  // ✨ Query جدید برای دریافت سفارشات من
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetMyOrdersQuery, // ✨
  useGetOrdersQuery,
  useDeliverOrderMutation
} = ordersApiSlice;