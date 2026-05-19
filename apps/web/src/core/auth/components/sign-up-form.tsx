import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useNavigate } from '@tanstack/react-router';
import { Controller, useForm } from 'react-hook-form';
import { type z } from 'zod';

import { registerUserSchema } from '@workspace/api-schemas/auth';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@workspace/ui/components/select';

import { useRegisterUser } from '../hooks/use-register-user';

type SignUpFormValues = z.infer<typeof registerUserSchema>;

const genderOptions: Array<{
  label: string;
  value: SignUpFormValues['gender'];
}> = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Unknown', value: 'unknown' },
  { label: 'Other', value: 'other' },
];

export function SignUpForm() {
  const register = useRegisterUser();
  const form = useForm({
    resolver: standardSchemaResolver(registerUserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      gender: 'other',
      password: '',
      phone: undefined,
    },
  });
  const navigate = useNavigate();

  const onSubmit = (values: SignUpFormValues) => {
    register.mutate(values, {
      onSuccess: () => {
        navigate({ to: '/sign-in' });
      },
    });
  };

  return (
    <div className='mx-auto w-full max-w-md'>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Enter the details below to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-4'>
            <Field>
              <FieldLabel htmlFor='firstName'>First name</FieldLabel>
              <FieldContent>
                <Input id='firstName' {...form.register('firstName')} />
                <FieldError
                  errors={
                    form.formState.errors.firstName
                      ? [form.formState.errors.firstName]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor='lastName'>Last name</FieldLabel>
              <FieldContent>
                <Input id='lastName' {...form.register('lastName')} />
                <FieldError
                  errors={
                    form.formState.errors.lastName
                      ? [form.formState.errors.lastName]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>

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
              <FieldLabel htmlFor='dateOfBirth'>Date of birth</FieldLabel>
              <FieldContent>
                <Input
                  id='dateOfBirth'
                  type='date'
                  {...form.register('dateOfBirth')}
                />
                <FieldError
                  errors={
                    form.formState.errors.dateOfBirth
                      ? [form.formState.errors.dateOfBirth]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>

            <Field>
              <FieldLabel htmlFor='gender'>Gender</FieldLabel>
              <FieldContent>
                <Controller
                  control={form.control}
                  name='gender'
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id='gender'>
                        <SelectValue placeholder='Select gender' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {genderOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError
                  errors={
                    form.formState.errors.gender
                      ? [form.formState.errors.gender]
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

            <Field>
              <FieldLabel htmlFor='phone'>Phone (optional)</FieldLabel>
              <FieldContent>
                <Input id='phone' {...form.register('phone')} />
                <FieldError
                  errors={
                    form.formState.errors.phone
                      ? [form.formState.errors.phone]
                      : undefined
                  }
                />
              </FieldContent>
            </Field>
          </CardContent>

          <CardFooter className='justify-between gap-4'>
            {register.isError && (
              <div className='text-destructive text-sm'>
                {(register.error as Error)?.message ?? 'Registration failed'}
              </div>
            )}

            <Button
              type='submit'
              disabled={register.isPending || register.isPending}
            >
              Create account
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
