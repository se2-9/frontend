'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { fetchPosts } from '@/lib/api/search';
import { CreatePostData } from '@/lib/validations/posts';
import FilterForm from '@/components/search/filter-form';
import { PostDTO } from '@/dtos/post';
import { useQuery } from '@tanstack/react-query';


var posts:PostDTO[] = [
];

export default function PostPage() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  // const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleFilter = async () => {
    const posts = await fetchPosts();
  };
  
  const { data: posts, isLoading, isError, refetch } = useQuery({
      queryKey: ["posts"],
      queryFn: fetchPosts,
      enabled: false,
  });
  return (
    <div className="flex gap-6 p-6">

      <section className="w-1/4 min-w-[200px] border-2 border-gray-400 p-4">
        <FilterForm refetch={refetch}/>
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
          
          {filteredPosts.map((post) => (
            <Card key={post.user_id + post.created_at} className="pt-6 bg-transparent border-gray-400">
              <CardContent className="flex flex-col gap-[24px]">
                <div className="font-[Nunito]">
                  <div className="flex flex-row justify-between mb-[10px]">
                    <p className="text-2xl font-semibold">{post.title}</p>
                    <p className="text-2xl font-bold">{post.hourly_rate} Baht / Hour</p>
                  </div>
                  {/* <div className="flex gap-x-[24px]">
                      {post.tags.map((tag) => (
                        <Badge key={tag} className="text-sm py-[4px]">{tag}</Badge>
                      ))}
                    </div> */}
                </div>
                <CardDescription className="">
                  {post.description}
                </CardDescription>
                <Button className="text-text bg-[#A4B1BA]">Request</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
