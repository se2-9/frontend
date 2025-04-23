'use client';

import { LoginRequest, loginSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
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
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { login } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { DtoToUser } from '@/utils/mapper/user-mapper';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);

  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<LoginRequest>({
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
        setAuth(
          data.result.access_token,
          data.result.expires_at,
          DtoToUser(data.result.user)
        );
        toast.success('Logged in!');
        if (data.result.user.role) {
          router.push(`/${data.result.user.role}/`);
        }
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(values: LoginRequest) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(onSubmit)(e);
        }}
        className="space-y-2 w-full mx-auto px-4 text-text"
      >
        <FormField
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  placeholder="Enter your email"
                  id="email"
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
                <div className="relative w-full">
                  <Input
                    {...field}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                      }
                    }}
                    placeholder="Enter your password"
                    id="password"
                    type={`${showPassword ? 'text' : 'password'}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="bg-background text-text h-fit absolute right-2 top-1/2 -translate-y-1/2 p-1"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </Button>
                </div>
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
          id="submit-login"
          className="w-full text-text bg-app-lightbrown"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
