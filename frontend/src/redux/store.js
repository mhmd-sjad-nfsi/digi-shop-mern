import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // اینجا در جلسات آینده، Slice های خودمان را اضافه خواهیم کرد
  },
});

export default store;