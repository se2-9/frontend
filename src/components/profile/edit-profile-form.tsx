'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeOffIcon, EyeIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

import {
  EditUserProfileFormRequest,
  EditUserProfileFormSchema,
} from '@/lib/validations/profile';
import { editUserProfile } from '@/lib/api/profile';
import { useAuthStore } from '@/store/auth-store';
import { DtoToUser } from '@/utils/mapper/user-mapper';

export default function EditProfileForm() {
  const [showPassword, setShowPassword] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<EditUserProfileFormRequest>({
    resolver: zodResolver(EditUserProfileFormSchema),
    defaultValues: {
      password: '',
      name: '',
      tutor_education_level: '',
      tutor_portfolio: '',
      date_of_birth: '',
      citizen_id: '',
      phone_number: '',
    },
  });

  useEffect(() => {
    if (currentUser) {
      form.reset({
        name: currentUser.name || '',
        tutor_education_level: currentUser.tutorEducationLevel || '',
        tutor_portfolio: currentUser.tutorPortfolio || '',
        date_of_birth: currentUser.dateOfBirth.split('T')[0],
        citizen_id: currentUser.citizenId || '',
        phone_number: currentUser.phoneNumber || '',
      });
    }
  }, [currentUser, form]);

  const mutation = useMutation({
    mutationFn: editUserProfile,
    onSuccess: (data) => {
      if (!data.result) return toast.error('Something went wrong');

      setAuth(
        useAuthStore.getState().accessToken,
        useAuthStore.getState().expiresAt,
        DtoToUser(data.result)
      );

      toast.success('Profile updated successfully');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = (values: EditUserProfileFormRequest) => {
    mutation.mutate({
      ...values,
      date_of_birth: `${values.date_of_birth}T00:00:00+07:00`,
      role: currentUser?.role || 'student',
      email: currentUser?.email || '',
      verify_status: true,
      gender: currentUser?.gender || 'male',
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-lg mx-auto"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your full name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="********"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {currentUser?.role === 'tutor' && (
          <>
            <FormField
              name="tutor_education_level"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., B.Eng in Computer Engineering"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="tutor_portfolio"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your teaching experience or portfolio"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          name="date_of_birth"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="citizen_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Citizen ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your national ID"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone_number"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 0801234567"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary text-white"
        >
          {mutation.isPending ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Form>
  );
}
