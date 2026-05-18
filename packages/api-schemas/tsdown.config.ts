import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    post: 'src/post/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: false,
});
