'use client';
import { useState } from 'react';
import CreatePost from '@/components/create-post';
import MyPosts from '@/components/my-post';
import MaxWidthWrapper from '@/components/max-width-wrapper';

type Post = {
  id: string;
  title: string;
  hourly_rate: number;
  is_online: boolean;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <MaxWidthWrapper className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl flex justify-between items-start gap-8 mt-[144px]">
        <div className="w-2/3">
          <CreatePost setPosts={setPosts} /> 
        </div>
        <div className="w-1/3">
          <MyPosts posts={posts} setPosts={setPosts} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
