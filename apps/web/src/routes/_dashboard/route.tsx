import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.token) return redirect({ to: '/sign-in' });
  },
});

function RouteComponent() {
  return <Outlet />;
}
