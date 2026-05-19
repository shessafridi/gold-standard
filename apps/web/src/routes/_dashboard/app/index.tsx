import { useCurrentUserProfile } from '@/core/auth/hooks/use-current-user-profile';
import { useLogout } from '@/core/auth/hooks/use-logout';
import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@workspace/ui/components/button';

export const Route = createFileRoute('/_dashboard/app/')({
  component: RouteComponent,
});

function RouteComponent() {
  const userQuery = useCurrentUserProfile();
  const user = userQuery.data;

  const logout = useLogout();

  return (
    <div>
      Hello "/_dashboard/app/"!
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <Button
        variant='destructive'
        onClick={() => {
          logout.mutate();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
