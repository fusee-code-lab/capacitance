import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import vuePlugin from '@vitejs/plugin-vue';

const root = resolve('src');
const outDir = resolve('dist');

let port = 0;
try {
  port = readFileSync(resolve('../.port'), 'utf8');
} catch (e) {
  throw 'not found .port';
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  root,
  server: {
    host: '0.0.0.0',
    port
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
