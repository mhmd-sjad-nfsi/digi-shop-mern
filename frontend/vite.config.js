// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // پراکسی برای تمام درخواست‌های API
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // ✨ پراکسی جدید برای پوشه آپلودها
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});