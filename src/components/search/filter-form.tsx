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
import { PostBackendData, postBackendSchema } from '@/lib/validations/posts';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu';

export default function FilterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(true);

  const setAuth = useAuthStore((state) => state.setAuth);

  const form = useForm<PostBackendData>({
    resolver: zodResolver(postBackendSchema),
    defaultValues: {
      title: '',
      subject: '',
      gender: '',
      is_online: '',
      place: '',
      hourly_rate: 1,
      min_hourly_rate: 1,
      max_hourly_rate: 10000,
    },
  });

  // const mutation = useMutation({
  //   mutationFn: login,
  //   onSuccess: async (data) => {
  //     if (!data.result) {
  //       toast.error('Something went wrong');
  //       return;
  //     }

  //     try {
  //       console.log(data);
  //       setAuth(
  //         data.result.access_token,
  //         data.result.expires_at,
  //         DtoToUser(data.result.user)
  //       );
  //       toast.success('Logged in!');
  //       router.push('/profile');
  //     } catch (error) {
  //       console.error(error);
  //       toast.error('Something went wrong');
  //     }
  //   },
  //   onError: (err) => toast.error(err.message),
  // });

  // function onSubmit(values: LoginRequest) {
  //   mutation.mutate(values);
  // }

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full mx-auto px-4 text-text font-[Nunito] "
        >
        <div className="flex flex-col gap-[24px] border-gray-400">
          <h1 className="text-2xl font-bold">Filters</h1>

          <FormField
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-lg'>Subject</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter subject"
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
          />

          <div className="flex justify-between gap-6">
            <div>
            <FormField
              name="min_hourly_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-lg'>Min cost</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        
                        {...field}
                        placeholder="-"
                      />
                      
                    </div>
                  </FormControl>
                </FormItem>
              )}
              control={form.control}
            />
            </div>
            <div>
            <FormField
              name="max_hourly_rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-lg'>Max cost</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        placeholder="-"
                      />
                      
                    </div>
                  </FormControl>
                </FormItem>
              )}
              control={form.control}
            />
            </div>
          </div>

          <FormField
            name="gender"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tutor&apos;s Gender</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="w-full text-text bg-lightbrown ">
                        {field.value || 'Select Gender'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup className='bg-lightbrown p-2 cursor-pointer'
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <DropdownMenuRadioItem value="Male" className='m-2 hover:bg-gray-300'>
                          Male
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Female" className='m-2 hover:bg-gray-300'>
                          Female
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="place"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-lg'>Teaching Place</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter place"
                    type="text"
                  />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
          />

          <FormField
            name="is_online"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-lg'>Online/Onsite</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button className="w-full text-text bg-lightbrown">
                        {field.value === undefined
                          ? 'Select Option'
                          : field.value
                            ? 'Online'
                            : 'Onsite'}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuRadioGroup className='bg-lightbrown p-2 cursor-pointer'
                        value={
                          field.value === undefined
                            ? undefined
                            : field.value
                              ? 'Online'
                              : 'Onsite'
                        }
                        onValueChange={(value) =>
                          field.onChange(value === 'Online')
                        }
                      >
                        <DropdownMenuRadioItem value="Online" className='m-2 hover:bg-gray-300'>
                          Online
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Onsite" className='m-2 hover:bg-gray-300'>
                          Onsite
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full text-text bg-[#B7BAA5]"
          >
            Apply
          </Button>
        </div>
      </form>
    </Form>
  );
}
