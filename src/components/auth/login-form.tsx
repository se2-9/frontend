'use client';

import { LoginFormData, loginSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button, buttonVariants } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { login } from '@/lib/api/auth';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export default function LoginForm() {
  const router = useRouter();

  const setTokens = useAuthStore((state) => state.setToken);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      if (!data.result) {
        toast.error('Something went wrong');
        return;
      }

      try {
        setTokens(data.result.access_token, data.result.refresh_token);
        await fetchUser();
        toast.success('Logged in!');
        router.push('/');
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: LoginFormData) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full mx-auto px-4"
      >
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormDescription className="text-destructive">
                {form.formState.errors.email?.message}
              </FormDescription>
            </FormItem>
          )}
          control={form.control}
        />
        <FormField
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                />
              </FormControl>
              <FormDescription className="text-destructive">
                {form.formState.errors.password?.message}
              </FormDescription>
            </FormItem>
          )}
          control={form.control}
        />
        <Button
          type="submit"
          className="w-full"
        >
          Login
        </Button>
        <Link
          className={cn(
            buttonVariants({ variant: 'link' }),
            'w-full text-center hover:underline'
          )}
          href="/register"
        >
          Don&apos;t have an account? Register
        </Link>
      </form>
    </Form>
  );
}
