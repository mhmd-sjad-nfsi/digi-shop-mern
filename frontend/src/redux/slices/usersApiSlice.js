import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, // این اندپوینت را بعدا در بک‌اند می‌سازیم
        method: 'POST',
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'], // ✨ هر عملیاتی که User را آپدیت می‌کند باید این تگ را داشته باشد
    }),
    
    // ✨ یک query جدید برای دریافت اطلاعات پروفایل
    getProfile: builder.query({
        query: () => `${USERS_URL}/profile`,
        providesTags: ['User'],
    }),

  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation, // ✨
  useGetProfileQuery,      // ✨
} = usersApiSlice;