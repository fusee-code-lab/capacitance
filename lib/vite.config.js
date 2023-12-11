import { defineConfig } from "vite";
import { resolve } from 'path';
import macrosPlugin from "vite-plugin-babel-macros";

const root = resolve("src");
const outDir = resolve("dist");

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  root,
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        jsx: "react",
      },
    },
    jsxInject: `import {h,f} from '@youliso/granule'`,
    jsxFactory: "h",
    jsxFragment: "f",
  },
  build: {
    outDir,
  },
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
  plugins: [macrosPlugin()],
});
