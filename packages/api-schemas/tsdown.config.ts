import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    auth: 'src/auth/index.ts',
    common: 'src/common/index.ts',
    post: 'src/post/index.ts',
    standard: 'src/standard/index.ts',
    user: 'src/user/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: false,
});
