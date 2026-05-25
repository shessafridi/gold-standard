export type AppRouterContext = {
  token: string | null;
  status: 'loading' | 'ready';
  isHydrating: boolean;
};
