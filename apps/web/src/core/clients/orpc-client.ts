import type { CreateClientOptions } from '@workspace/api-client';
import { createClient, createQueryUtils } from '@workspace/api-client';

type TokenGetter = () => string | null;
let tokenGetter: TokenGetter | null = null;

export const injectTokenGetter = (getter: TokenGetter) => {
  tokenGetter = getter;
};

const baseUrl = `${import.meta.env['VITE_API_URL']}/api`;

const options: CreateClientOptions = {
  url: baseUrl,
  headers: () => {
    if (!tokenGetter) throw new Error('Token Getter not injected');
    const token = tokenGetter();
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`,
    };
  },
};

export const orpcClient = createClient(options);
export const orpcQueryClient = createQueryUtils(options);
