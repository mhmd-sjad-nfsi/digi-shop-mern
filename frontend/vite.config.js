import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ✨ این بخش را اضافه کنید
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // آدرس بک‌اند شما
        changeOrigin: true,
      },
    },
  },
})