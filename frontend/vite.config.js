import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main:"index.html",
        // main: 'App.jsx',
      },
    },
  },
});
