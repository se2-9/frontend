'use client';
import type { UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { FilterPostDTO, PostDTO } from '@/dtos/post';
import { X } from 'lucide-react';

interface FilterFormProps {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<PostDTO[], Error>>;
  form: UseFormReturn<FilterPostDTO, unknown, undefined>;
}

export default function FilterForm({ refetch, form }: FilterFormProps) {
  function onSubmit(values: FilterPostDTO) {
    console.log(values);
    refetch();
  }

  function onReset() {
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 h-[480px] overflow-scroll scrollbar-hide px-2"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Filter Posts</h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter title"
                    className="border-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
          />

          <FormField
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Subject
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter subject"
                    className="border-gray-300"
                  />
                </FormControl>
              </FormItem>
            )}
            control={form.control}
          />
        </div>

        <div className="space-y-2">
          <FormLabel className="font-semibold text-gray-700">
            Price Range
          </FormLabel>
          <div className="flex items-center space-x-4">
            <FormField
              name="min_price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Min"
                      className="border-gray-300"
                    />
                  </FormControl>
                </FormItem>
              )}
              control={form.control}
            />
            <span className="text-gray-500">to</span>
            <FormField
              name="max_price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Max"
                      className="border-gray-300"
                    />
                  </FormControl>
                </FormItem>
              )}
              control={form.control}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="tutor_gender"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Tutor&apos;s Gender
                </FormLabel>
                <Select
                  value={String(field.value)}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name="is_online"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">
                  Lesson Type
                </FormLabel>
                <Select
                  value={
                    field.value === undefined ? 'any' : String(field.value)
                  }
                  onValueChange={(value) => {
                    if (value === 'any') {
                      field.onChange(undefined);
                    } else {
                      field.onChange(value === 'true');
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Online</SelectItem>
                      <SelectItem value="false">Onsite</SelectItem>
                      <SelectItem value="any">Any</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="place"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-700">
                Teaching Place
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter place"
                  className="border-gray-300"
                />
              </FormControl>
            </FormItem>
          )}
          control={form.control}
        />

        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-gray-700">
                Description
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter description"
                  className="border-gray-300"
                />
              </FormControl>
            </FormItem>
          )}
          control={form.control}
        />

        <Button
          type="submit"
          className="w-full bg-app-lightbrown text-text hover:text-white"
        >
          Apply Filters
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onReset}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </form>
    </Form>
  );
}
