import { LoginForm } from '@/core/auth/components/login-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='mx-auto flex min-h-dvh max-w-5xl items-center justify-center p-5'>
      <div className='flex-1'>
        <LoginForm />
      </div>
    </div>
  );
}
