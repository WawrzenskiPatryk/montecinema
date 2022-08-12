import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  //
  //// below import has been moved to main.js file with simpler approach
  //// due to a bug that occured randomly
  // unexpected, but works again without problems
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/assets/stylesheets/base.scss';`,
      },
    },
  },

  plugins: [vue(), svgLoader()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
