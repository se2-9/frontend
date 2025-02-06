'use client';
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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './ui/dropdown-menu';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

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
    },
  });

  const mutation = useMutation({
    mutationFn: createPost,
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
    mutation.mutate(values);
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full mx-auto"
          >
            {/* Title Field */}
            <FormField
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter post title"
                    />
                  </FormControl>
                  <FormDescription className="text-destructive">
                    {form.formState.errors.title?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Subject Field */}
            <FormField
              name="Subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter subject"
                    />
                  </FormControl>
                  <FormDescription className="text-destructive">
                    {form.formState.errors.Subject?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Gender Field */}
            <FormField
              name="Tutor's Gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tutor&apos;s Gender</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
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
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
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
                            Female
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormDescription className="text-destructive">
                    {form.formState.errors.Gender?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Online or Onsite Field */}
            <FormField
              name="OnlineOnsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Online/Onsite</FormLabel>
                  <FormControl>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
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
                            Onsite
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                  <FormDescription className="text-destructive">
                    {form.formState.errors.OnlineOnsite?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Place Field */}
            <FormField
              name="Place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter place"
                    />
                  </FormControl>
                  <FormDescription className="text-destructive">
                    {form.formState.errors.Place?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* HourlyRate Field */}
            <FormField
              name="HourlyRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate (Bath / Hour)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Enter hourly rate"
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value, 10) || 0)
                      }
                    />
                  </FormControl>
                  <FormDescription className="text-destructive">
                    {form.formState.errors.HourlyRate?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Enter description"
                      className="w-full h-32 resize-none pt-2 px-2 leading-normal border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 hover:bg-gray-100"
                      style={{ textAlign: 'left', overflowWrap: 'break-word' }}
                    />
                  </FormControl>
                  <FormDescription className="text-destructive">
                    {form.formState.errors.Description?.message}
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full mt-4 hover:bg-gray-100"
            >
              Create Post
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
