import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../../constants"; // ✨ فایل constants را بعدا می‌سازیم

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: USERS_URL,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`, // این اندپوینت را بعدا در بک‌اند می‌سازیم
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"], // ✨ هر عملیاتی که User را آپدیت می‌کند باید این تگ را داشته باشد
    }),

    // ✨ یک query جدید برای دریافت اطلاعات پروفایل
    getProfile: builder.query({
      query: () => `${USERS_URL}/profile`,
      providesTags: ["User"],
    }),
    
  getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['User'], // برای کش کردن
      keepUnusedDataFor: 5,
    }),
    
    // ✨ Mutation جدید برای حذف کاربر
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
    }),
 getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    
    // ✨ Mutation جدید برای به‌روزرسانی کاربر
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'], // ✨ باعث می‌شود کش لیست کاربران باطل و دوباره فراخوانی شود
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUpdateProfileMutation, // ✨
  useGetProfileQuery, // ✨
  useGetUsersQuery, // ✨
  useDeleteUserMutation, // ✨
  useGetUserDetailsQuery, // ✨
  useUpdateUserMutation, // ✨
  
} = usersApiSlice;
