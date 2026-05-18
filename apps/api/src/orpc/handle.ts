import { RPCHandler } from '@orpc/server/fetch';
import { router } from './router';
import { CORSPlugin } from '@orpc/server/plugins';
import { onError } from '@orpc/server';

export const orpcHandler = new RPCHandler(router, {
  plugins: [new CORSPlugin()],
  interceptors: [
    onError(error => {
      console.error(error);
    }),
  ],
});
