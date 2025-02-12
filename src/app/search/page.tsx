'use client';

import { useEffect, useState } from 'react';
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
import { FilterPostDTO, PostDTO} from '@/dtos/post';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import MaxWidthWrapper from '@/components/max-width-wrapper';


export default function PostPage() {
  const [search, setSearch] = useState('');
  const [sortFromHigh, setSortFromHigh] = useState("Highest Rate")
  const [postsShow, setPostsShow] = useState<PostDTO[]>([])
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
    queryKey: ['posts'], 
    queryFn: async () => {
      const p = (await fetchPosts(form.getValues() as FilterPostDTO))
      if (p?.result){
        p.result= [...p.result].sort((a:PostDTO, b:PostDTO)=> sortFromHigh ==="Highest Rate"?b.hourly_rate-a.hourly_rate:a.hourly_rate-b.hourly_rate)
      }
      
      return p
    },
    enabled:false
    });
  useEffect(()=>{
    console.log(sortFromHigh)
    if (posts?.result){
      setPostsShow([...posts.result].sort((a:PostDTO, b:PostDTO)=> sortFromHigh === "Highest Rate"?b.hourly_rate-a.hourly_rate:a.hourly_rate-b.hourly_rate))
      // console.log(posts.result)
    }
  }, [sortFromHigh, posts, setPostsShow])
  
  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col p-4 justify-center items-center space-y-2 md:flex-row md:space-x-2 md:items-start">
      <Card className="w-full p-4 md:w-2/5 bg-background mt-2">
        <CardHeader>
          <CardTitle className='text-2l'>
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FilterForm refetch={refetch} form={form}/>
        </CardContent>
      </Card>
        
      <Card className="w-full p-4 bg-background md:w-3/5">
        <CardHeader>
          <CardTitle>
            All Posts
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className="flex justify-between items-center space-x-2">
            <Input className="px-5 py-5 w-5/6"
              placeholder="Search..."
              value={search}  
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select value={sortFromHigh} onValueChange={setSortFromHigh} defaultValue="Highest Rate">
              <SelectTrigger className="w-1/5 min-w-20 ">
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
          
          {postsShow.map((post:PostDTO) => (
            <Card key={post.user_id + post.created_at} className="pt-6 bg-transparent">
              <CardContent className="flex flex-col gap-[24px]">
                <div className="flex flex-col items-end justify-end">
                    <p className="text-lg font-semibold">{post.title}</p>
                    <p className="text-lg font-semibold">{post.hourly_rate} Baht / Hour</p>
                  
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
