'use client';

import React from 'react';
import {UseFormReturn } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ApiResponse } from '@/types/api';
import { FilterPostDTO, PostDTO } from '@/dtos/post';

interface FilterFormProps {
  refetch: (
    options?: RefetchOptions) => Promise<QueryObserverResult<ApiResponse<PostDTO[]>, Error>>;
    form: UseFormReturn<FilterPostDTO, unknown, undefined>
}


export default function FilterForm({ refetch, form }: FilterFormProps) {
  
  function onSubmit(values: FilterPostDTO) {
    console.log(values)
    refetch()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full mx-auto px-4 text-text font-[Nunito] "
        >
        <div className="flex flex-col gap-[24px] border-gray-400">
          <h1 className="text-2xl font-bold">Filters</h1>

          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-lg'>Title</FormLabel>
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
              name="min_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-lg'>Min cost</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        
                        {...field}
                        placeholder="1"
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
              name="max_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-semibold text-lg'>Max cost</FormLabel>
                  <FormControl>
                    <div className="relative w-full">
                      <Input
                        {...field}
                        placeholder="10000"
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
            name="tutor_gender"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-lg'>Tutor&apos;s Gender</FormLabel>
                <FormControl>
                <Select
                    value={String(field.value)}
                    onValueChange={field.onChange} 
                  >
                    <SelectTrigger className="w-1/6 min-w-[140px] border-2 border-gray-400">
                      <SelectValue defaultValue="male" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectGroup>
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
                <FormLabel className='font-semibold text-lg'>Online/Onsite</FormLabel>
                <FormControl>
                  <Select
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(value === 'true')} 
                  >
                    <SelectTrigger className="w-1/6 min-w-[140px] border-2 border-gray-400">
                      <SelectValue defaultValue="true" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="true">Online</SelectItem>
                        <SelectItem value="false">Onsite</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold text-lg'>Desc</FormLabel>
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