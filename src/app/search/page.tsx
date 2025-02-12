'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchPosts } from '@/lib/api/search';
import FilterForm from '@/components/search/filter-form';
import { FilterPostDTO} from '@/dtos/post';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import MaxWidthWrapper from '@/components/max-width-wrapper';


export default function PostPage() {
  const [search, setSearch] = useState('');
  const form = useForm<FilterPostDTO>({
    defaultValues: {
      title: '',
      subject: '',
      tutor_gender: '',
      is_online: undefined,
      place: '',
      min_price: 1,
      max_price: 10000,
      description: '',
    },
  });
  
  const { data:posts, refetch } = useQuery({
    queryKey: ['posts', form.watch()], 
    queryFn: async ({ queryKey }) => {
      const [, filters] = queryKey; 
      return fetchPosts(filters as FilterPostDTO);
    },
    enabled: false, 
  });

  
  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col p-4 justify-center items-center space-y-2 md:flex-row md:space-x-2 md:items-start">


      {/* <section className="w-3/4 min-w-[200px] border-2 border-gray-400 p-4 md:w-1/3"> */}
      <Card className="w-3/4 p-4 md:w-2/5 border-2 bg-background border-gray-400 mt-2">
        <CardHeader>
          <CardTitle className='text-2l'>
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FilterForm refetch={refetch} form={form}/>
        </CardContent>
      </Card>
        
      <Card className="w-3/4 border-2 border-gray-400 p-4 bg-background md:w-3/5">
        <CardHeader>
          <CardTitle>
            All Posts
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className="flex justify-between items-center gap-[24px]">
            <Input className="px-[24px] py-[20px] w-5/6 border-2 border-gray-400"
              placeholder="Search..."
              value={search}  
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select defaultValue="Highest Rate">
              <SelectTrigger className="w-1/6 min-w-[140px] border-2 border-gray-400">
                <SelectValue/>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Highest Rate">Highest Rate</SelectItem>
                  <SelectItem value="Lowest Rate">Lowest Rate</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {posts?.result?.map((post) => (
            <Card key={post.user_id + post.created_at} className="pt-6 bg-transparent border-gray-400">
              <CardContent className="flex flex-col gap-[24px]">
                <div className="font-[Nunito]">
                  <div className="flex flex-row justify-between mb-[10px]">
                    <p className="text-2xl font-semibold">{post.title}</p>
                    <p className="text-2xl font-bold">{post.hourly_rate} Baht / Hour</p>
                  </div>
                  
                </div>
                <CardDescription className="">
                  {post.description}
                </CardDescription>
                <Button className="text-text bg-blue">Request</Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
        {/* <div className="flex flex-col gap-[24px]"> */}
          {/* <p className="text-2xl">All Post</p> */}
          
        {/* </div> */}
      </Card>
    </ MaxWidthWrapper>
  );
}
