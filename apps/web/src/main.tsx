import { browserTokenStorage } from '@/core/auth/browser-token-storage.ts';
import RouterProvider from '@/core/providers/router-provider';
import { createRouter } from '@tanstack/react-router';

import { AuthProvider } from '@workspace/auth-react';

import '@workspace/ui/globals.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import type { AppRouterContext } from './core/types/router-context';
import { routeTree } from './routeTree.gen';

// @ts-expect-error fixes some errors with chart libraries
window.global ??= window;

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    status: 'loading',
    token: null,
    isHydrating: true,
  } as AppRouterContext,
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider storage={browserTokenStorage}>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
