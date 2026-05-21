import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxyOptions = {
  target: 'http://localhost:3000',
  changeOrigin: true,
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/state': proxyOptions,
      '/print-job-3d': proxyOptions,
    },
  },
});
