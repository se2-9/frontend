'use client';
import { useState } from 'react';
import CreatePost from '@/components/create-post';
import MyPosts from '@/components/my-post';
import MaxWidthWrapper from '@/components/max-width-wrapper';

type Post = {
  id: string;
  title: string;
  HourlyRate: number;
  OnlineOnsite: string;
};

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <MaxWidthWrapper className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md mt-[144px]">
        <CreatePost />
        <MyPosts posts={posts} setPosts={setPosts} />
      </div>
    </MaxWidthWrapper>
  );
}
