'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription} from '@/components/ui/card';
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


export default function PostPage() {
  const [search, setSearch] = useState('');
  const form = useForm<FilterPostDTO>({
    defaultValues: {
      title: '',
      subject: '',
      tutor_gender: undefined,
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
    <div className="flex gap-6 p-6">

      <section className="w-1/4 min-w-[200px] border-2 border-gray-400 p-4">
        <FilterForm refetch={refetch} form={form}/>
      </section>
      
      <section className="w-3/4 border-2 border-gray-400 p-4">
        <div className="flex flex-col gap-[24px] ">
          <p className="text-2xl font-[Nunito] font-bold">All Post</p>
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
        </div>
      </section>
    </div>
  );
}
