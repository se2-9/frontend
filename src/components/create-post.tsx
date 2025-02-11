'use client';
<<<<<<< HEAD
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostSchema } from '@/lib/validations/posts';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createPost } from '@/lib/api/posts';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
} from './ui/form';
=======

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createPostSchema, CreatePostData } from '@/lib/validations/post';
import { createPost } from '@/lib/api/post';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormField, FormItem, FormControl, FormLabel } from './ui/form';
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './ui/dropdown-menu';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
<<<<<<< HEAD

export default function CreatePost() {
  const form = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      Subject: '',
      Gender: '',
      OnlineOnsite: '',
      Place: '',
      HourlyRate: 0,
      Description: '',
=======
import { useAuthStore } from '@/store/auth-store';

export default function CreatePost() {
  const form = useForm<CreatePostData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      subject: '',
      tutor_gender: undefined,
      is_online: undefined,
      place: '',
      hourly_rate: 0,
      description: '',
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
    },
  });

  const mutation = useMutation({
    mutationFn: createPost,
<<<<<<< HEAD
    onSuccess: () => {
      toast.success('Post created!');
      // Redirect to the post list or show success
    },
    onError: (err) => {
      toast.error(err.message || 'Error creating post');
    },
  });

  function onSubmit(values: {
    title: string;
    Subject: string;
    Gender: string;
    OnlineOnsite: string;
    Place: string;
    HourlyRate: number;
    Description: string;
  }) {
=======
    onSuccess: (data) => {
      if (!data.result) {
        toast.error('Something went wrong');
        return;
      }

      toast.success('Post created successfully!');
      form.reset();
    },
    onError: (err) => {
      console.error('❌ Full error creating post:', err);
      if (err instanceof Error) {
        toast.error(err.message || 'Error creating post');
      } else {
        toast.error('Unexpected error');
      }
    },
  });

  function onSubmit(values: CreatePostData) {
    const token = useAuthStore.getState().accessToken;
    console.log('🔍 Token before request:', token); // Debugging

    if (!token) {
      toast.error('Authentication error: No token found');
      return;
    }
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
    mutation.mutate(values);
  }

  return (
<<<<<<< HEAD
    <Card className="">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
=======
    <Card className="max-w-lg mx-auto p-6 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Create Post</CardTitle>
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
<<<<<<< HEAD
            className="space-y-4 w-full mx-auto"
=======
            className="space-y-4"
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
          >
            {/* Title Field */}
            <FormField
              name="title"
<<<<<<< HEAD
=======
              control={form.control}
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter post title"
                    />
                  </FormControl>
<<<<<<< HEAD
                  <FormDescription className="text-destructive">
                    {form.formState.errors.title?.message}
                  </FormDescription>
=======
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                </FormItem>
              )}
            />

            {/* Subject Field */}
            <FormField
<<<<<<< HEAD
              name="Subject"
=======
              name="subject"
              control={form.control}
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter subject"
                    />
                  </FormControl>
<<<<<<< HEAD
                  <FormDescription className="text-destructive">
                    {form.formState.errors.Subject?.message}
                  </FormDescription>
=======
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                </FormItem>
              )}
            />

            {/* Gender Field */}
            <FormField
<<<<<<< HEAD
              name="Tutor's Gender"
=======
              name="tutor_gender"
              control={form.control}
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tutor&apos;s Gender</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
<<<<<<< HEAD
                        <Button
                          className={`w-full flex justify-between items-center bg-white border border-gray-300 rounded-md ${
                            !field.value ? 'text-gray-500' : 'text-black'
                          } hover:bg-gray-100 hover:text-black`}
                        >
                          {field.value || 'Select Gender'}
                          <span className="ml-2 text-black">&#x25BC;</span>{' '}
                          {/* Down arrow in black */}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-gray-300 rounded-md">
=======
                        <Button className="w-full text-text bg-lightbrown ">
                          {field.value || 'Select Gender'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
<<<<<<< HEAD
                          <DropdownMenuRadioItem
                            value="Male"
                            className="text-black"
                          >
                            Male
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            value="Female"
                            className="text-black"
                          >
=======
                          <DropdownMenuRadioItem value="Male">
                            Male
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Female">
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                            Female
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
<<<<<<< HEAD
                  <FormDescription className="text-destructive">
                    {form.formState.errors.Gender?.message}
                  </FormDescription>
=======
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                </FormItem>
              )}
            />

<<<<<<< HEAD
            {/* Online or Onsite Field */}
            <FormField
              name="OnlineOnsite"
=======
            {/* Online/Onsite Field */}
            <FormField
              name="is_online"
              control={form.control}
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Online/Onsite</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
<<<<<<< HEAD
                        <Button
                          className={`w-full flex justify-between items-center bg-white border border-gray-300 rounded-md ${
                            !field.value ? 'text-gray-500' : 'text-black'
                          } hover:bg-gray-100 hover:text-black`}
                        >
                          {field.value || 'Select Option'}
                          <span className="ml-2 text-black">&#x25BC;</span>{' '}
                          {/* Down arrow in black */}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border border-gray-300 rounded-md">
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <DropdownMenuRadioItem
                            value="Online"
                            className="text-black"
                          >
                            Online
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            value="Onsite"
                            className="text-black"
                          >
=======
                        <Button className="w-full text-text bg-lightbrown">
                          {field.value === undefined
                            ? 'Select Option'
                            : field.value
                              ? 'Online'
                              : 'Onsite'}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuRadioGroup
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
                          <DropdownMenuRadioItem value="Online">
                            Online
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Onsite">
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                            Onsite
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
<<<<<<< HEAD
                  <FormDescription className="text-destructive">
                    {form.formState.errors.OnlineOnsite?.message}
                  </FormDescription>
=======
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                </FormItem>
              )}
            />

            {/* Place Field */}
            <FormField
<<<<<<< HEAD
              name="Place"
=======
              name="place"
              control={form.control}
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter place"
                    />
                  </FormControl>
<<<<<<< HEAD
                  <FormDescription className="text-destructive">
                    {form.formState.errors.Place?.message}
                  </FormDescription>
=======
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                </FormItem>
              )}
            />

<<<<<<< HEAD
            {/* HourlyRate Field */}
            <FormField
              name="HourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate (Bath / Hour)</FormLabel>
=======
            {/* Hourly Rate Field */}
            <FormField
              name="hourly_rate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate (Baht / Hour)</FormLabel>
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
<<<<<<< HEAD
                      placeholder="Enter hourly rate"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-destructive">
                    {form.formState.errors.HourlyRate?.message}
                  </FormDescription>
=======
                      placeholder="0"
                      value={field.value === 0 ? '' : field.value} // Avoid displaying 0
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          field.onChange(value ? Number(value) : ''); // Remove leading 0s
                        }
                      }}
                    />
                  </FormControl>
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
<<<<<<< HEAD
              name="Description"
=======
              name="description"
              control={form.control}
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Enter description"
<<<<<<< HEAD
                      className="w-full h-32 resize-none pt-2 px-2 leading-normal border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
                      style={{ textAlign: 'left', overflowWrap: 'break-word' }}
                    />
                  </FormControl>
                  <FormDescription className="text-destructive">
                    {form.formState.errors.Description?.message}
                  </FormDescription>
=======
                      className="w-full h-32 resize-none p-2 border border-gray-300 rounded-md"
                    />
                  </FormControl>
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
                </FormItem>
              )}
            />

<<<<<<< HEAD
            <Button
              type="submit"
              className="w-full mt-4 hover:bg-gray-100"
=======
            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-text bg-lightbrown"
>>>>>>> 9bf0f97e80c9da09fa00d1160d7732524659b7c0
            >
              Create Post
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
