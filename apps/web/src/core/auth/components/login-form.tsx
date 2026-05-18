import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@tanstack/react-router';
import { loginSchema } from '@workspace/api-schemas/auth';
import { Button } from '@workspace/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@workspace/ui/components/card';
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from '@workspace/ui/components/field';
import { Input } from '@workspace/ui/components/input';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';
import { useLogin } from '../hooks/use-login';

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const login = useLogin();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    login.mutate(values, {
      onSuccess: () => {
        void router.invalidate();
      },
    });
  };

  return (
    <div className='mx-auto w-full max-w-md'>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Access your account with email and password.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-4'>
            <Field>
              <FieldLabel htmlFor='email'>Email</FieldLabel>
              <FieldContent>
                <Input id='email' type='email' {...form.register('email')} />
                <FieldError
                  errors={
                    form.formState.errors.email
                      ? [form.formState.errors.email]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor='password'>Password</FieldLabel>
              <FieldContent>
                <Input
                  id='password'
                  type='password'
                  {...form.register('password')}
                />
                <FieldError
                  errors={
                    form.formState.errors.password
                      ? [form.formState.errors.password]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>
          </CardContent>

          <CardFooter className='justify-between gap-4'>
            {login.isError && (
              <div className='text-destructive text-sm'>
                {(login.error as Error)?.message ?? 'Login failed'}
              </div>
            )}

            <Button type='submit' disabled={login.isPending || login.isPending}>
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
