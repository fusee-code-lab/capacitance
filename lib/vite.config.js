import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import macrosPlugin from 'vite-plugin-babel-macros';

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
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        jsx: 'react'
      }
    },
    jsxInject: `import {h,f} from '@youliso/granule'`,
    jsxFactory: 'h',
    jsxFragment: 'f'
  },
  build: {
    outDir,
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  plugins: [macrosPlugin()]
});
