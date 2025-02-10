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


const posts = [
  {
    id: 1,
    title: 'Physics for Elementary',
    tags: ['Physics', 'Online', 'Women Only'],
    price: '250 Baht / Hour',
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsam fugiat, quibusdam inventore culpa corporis iusto? Maiores quae minima reprehenderit architecto at soluta in inventore error nam. Ipsa, sequi quidem."
  },
  {
    id: 2,
    title: 'Physics for Old',
    tags: ['Physics', 'Online', 'Women Only'],
    price: '250 Baht / Hour',
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsam fugiat, quibusdam inventore culpa corporis iusto? Maiores quae minima reprehenderit architecto at soluta in inventore error nam. Ipsa, sequi quidem."
  },
];

export default function PostPage() {
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleFilter = () => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(subject.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="flex gap-6 p-6">
      <div className="w-1/4 bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Filters</h3>
        <label className="block mb-2">Subject</label>
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter subject" />
        <Button className="mt-4 w-full" onClick={handleFilter}>Apply</Button>
      </div>
      
      <section className="w-3/4">
        <div className="flex flex-col gap-[24px] ">
          <p className="text-2xl">All Post</p>
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
            <Card key={post.id} className="pt-6 bg-transparent border-gray-400">
              <CardContent className="flex flex-col gap-[24px]">
                <div className="font-[Nunito]">
                  <div className="flex flex-row justify-between mb-[10px]">
                    <p className="text-2xl font-semibold">{post.title}</p>
                    <p className="text-2xl font-bold">{post.price}</p>
                  </div>
                  <div className="flex gap-x-[24px]">
                      {post.tags.map((tag) => (
                        <Badge key={tag} className="text-sm py-[4px]">{tag}</Badge>
                      ))}
                    </div>
                </div>
                <CardDescription className="">
                  {post.desc}
                </CardDescription>
                <Button className="">Request</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
