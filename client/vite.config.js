import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/state': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/print-job-3d': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
