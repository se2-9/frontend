'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createPostSchema, type CreatePostData } from '@/lib/validations/post';
import { createPost } from '@/lib/api/post';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormField, FormItem, FormControl, FormLabel } from '../ui/form';
import { useAuthStore } from '@/store/auth-store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

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
    if (!token) {
      toast.error('Authentication error: No token found');
      return;
    }
    mutation.mutate(values);
  }

  return (
    <div className="max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <FormField
              name="tutor_gender"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tutor&apos;s Gender</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="is_online"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Online/Onsite</FormLabel>
                  <FormControl>
                    <Select
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
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Online">Online</SelectItem>
                        <SelectItem value="Onsite">Onsite</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

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
                      value={field.value === 0 ? '' : field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                          field.onChange(value ? Number(value) : '');
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

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
                    className="w-full h-24 resize-none p-2 border border-input bg-background rounded-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-lightbrown text-text"
          >
            Create Post
          </Button>
        </form>
      </Form>
    </div>
  );
}
