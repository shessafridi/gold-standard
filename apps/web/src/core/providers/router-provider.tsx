import type { ComponentProps } from 'react';

import { useAuth } from '@workspace/auth-react';

import type { RegisteredRouter } from '@tanstack/react-router';
import { RouterProvider as TanstackRouterProvider } from '@tanstack/react-router';

interface Props {
  router: ComponentProps<
    typeof TanstackRouterProvider<RegisteredRouter>
  >['router'];
}

export default function RouterProvider({ router }: Props) {
  const status = useAuth(s => s.status);
  const isHydrating = useAuth(s => s.isHydrating);
  const token = useAuth(s => s.token);

  console.log({
    status,
    isHydrating,
    token,
  });

  if (isHydrating) return null;

  return (
    <TanstackRouterProvider
      router={router}
      context={{
        token,
        status,
        isHydrating,
      }}
    />
  );
}
