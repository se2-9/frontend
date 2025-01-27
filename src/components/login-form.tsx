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
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function LoginForm() {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFormData) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full mx-auto"
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
          Submit
        </Button>
      </form>
    </Form>
  );
}
