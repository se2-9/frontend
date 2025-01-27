'use client';

import { RegisterFormData, registerSchema } from '@/lib/validations/auth';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { register } from '@/lib/api/auth';
import { toast } from 'sonner';

export default function RegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => toast.success('Account created!'),
    onError: () => toast.error('Failed to create account'),
  });

  const onSubmit = (values: RegisterFormData) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full mx-auto px-4"
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
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
