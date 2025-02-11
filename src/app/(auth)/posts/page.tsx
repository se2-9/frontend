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
      {/* Container for side-by-side layout */}
      <div className="w-full max-w-5xl flex justify-between items-start gap-8 mt-[144px]">
        {/* Left Side: Create Post */}
        <div className="w-2/3"> {/* Takes 2/3 of the width */}
          <CreatePost />
        </div>

        {/* Right Side: My Posts */}
        <div className="w-1/3"> {/* Takes 1/3 of the width */}
          <MyPosts posts={posts} setPosts={setPosts} />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}