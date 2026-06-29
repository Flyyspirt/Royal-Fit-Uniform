import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        lookbook: resolve(__dirname, 'lookbook.html'),
        product: resolve(__dirname, 'product.html'),
        contact: resolve(__dirname, 'contact.html'),
        about: resolve(__dirname, 'about.html'),
        solutions: resolve(__dirname, 'solutions.html'),
      },
    },
  },
});
