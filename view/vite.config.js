import { defineConfig } from 'vite';
import { resolve } from 'path';
import vuePlugin from '@vitejs/plugin-vue';

const root = resolve('src');
const outDir = resolve('dist');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  base: './',
  server: {
    host: '0.0.0.0'
  },
  build: {
    outDir,
    emptyOutDir: true,
    target: 'esnext',
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [vuePlugin()]
});