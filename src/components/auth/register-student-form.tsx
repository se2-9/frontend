'use client';

import {
  RegisterStudentRequest,
  registerStudentSchema,
} from '@/lib/validations/auth';
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
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { registerStudent } from '@/lib/api/auth';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function RegisterStudentForm() {
  const [showPassword, setShowPassword] = useState(true);
  const router = useRouter();

  const form = useForm<RegisterStudentRequest>({
    resolver: zodResolver(registerStudentSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const mutation = useMutation({
    mutationFn: registerStudent,
    onSuccess: () => {
      toast.success('Account created!');
      router.push(
        `/verify-code?email=${encodeURIComponent(form.getValues().email)}`
      );
    },
    onError: (err) => toast.error(err.message),
  });

  const onSubmit = (values: RegisterStudentRequest) => {
    mutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full mx-auto px-4 text-text"
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
                  placeholder="Enter your name"
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
                  placeholder="Enter your email"
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
                    placeholder="Enter your password"
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
          className="w-full text-text bg-blue"
        >
          Register As Student
        </Button>
      </form>
    </Form>
  );
}
