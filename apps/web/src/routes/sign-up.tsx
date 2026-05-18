import { SignUpForm } from '@/core/auth/components/sign-up-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className='mx-auto flex min-h-dvh max-w-5xl items-center justify-center p-5'>
      <div className='flex-1'>
        <SignUpForm />
      </div>
    </div>
  );
}
