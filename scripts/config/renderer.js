const { defineConfig } = require('vite');
const vuePlugin = require('@vitejs/plugin-vue');
const { resolve } = require('path');
const root = resolve('web');
const outDir = resolve('webdist');

// https://vitejs.dev/config/
module.exports = defineConfig({
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
      '@': resolve('./')
    }
  },
  plugins: [vuePlugin()]
});
