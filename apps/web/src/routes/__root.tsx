import { injectTokenGetter } from '@/core/clients/orpc-client';
import queryClient from '@/core/clients/query-client';
import { ThemeProvider } from '@/core/providers/theme-provider';
import type { AppRouterContext } from '@/core/types/router-context';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from '@tanstack/react-router';
import { useAuthStatus, useAuthStore } from '@workspace/auth-react';
import { Toaster } from '@workspace/ui/components/sonner';

export const Route = createRootRouteWithContext<AppRouterContext>()({
  beforeLoad: ({ context, location }) => {
    if (
      context.token &&
      context.status === 'ready' &&
      (location.pathname === '/sign-in' || location.pathname === '/sign-up')
    )
      return redirect({ to: '/' });
  },
  component: RootComponent,
});

function RootComponent() {
  const authStatus = useAuthStatus();
  const store = useAuthStore();

  injectTokenGetter(() => store.getState().token);

  if (authStatus === 'loading') return null;

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Toaster />
    </ThemeProvider>
  );
}
