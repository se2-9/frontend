'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createPostSchema, CreatePostData } from '@/lib/validations/post';
import { createPost } from '@/lib/api/post';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormField, FormItem, FormControl, FormLabel } from './ui/form';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from './ui/dropdown-menu';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
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
    },
  });

  const mutation = useMutation({
    mutationFn: createPost,
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
    mutation.mutate(values);
  }

  return (
    <Card className="max-w-lg mx-auto p-6 shadow-lg rounded-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Create Post</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Title Field */}
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter post title"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Subject Field */}
            <FormField
              name="subject"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter subject"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Gender Field */}
            <FormField
              name="tutor_gender"
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
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <DropdownMenuRadioItem value="Male">
                            Male
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Female">
                            Female
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Online/Onsite Field */}
            <FormField
              name="is_online"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Online/Onsite</FormLabel>
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
                            Onsite
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Place Field */}
            <FormField
              name="place"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Place</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter place"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Hourly Rate Field */}
            <FormField
              name="hourly_rate"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hourly Rate (Baht / Hour)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
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
                </FormItem>
              )}
            />

            {/* Description Field */}
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Enter description"
                      className="w-full h-32 resize-none p-2 border border-gray-300 rounded-md"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-text bg-lightbrown"
            >
              Create Post
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
