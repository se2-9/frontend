'use client';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import CreatePost from '@/components/posts/create-post';
import { PostList } from '@/components/posts/post-list';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { usePosts } from '@/hooks/usePosts';
import { Loader2Icon } from 'lucide-react';

export default function Page() {
  const { data, isLoading } = usePosts();
  if (isLoading) return <Loader2Icon className="animate-spin" />;

  console.log(data);

  return (
    <div className="w-full flex items-center justify-center mt-10 max-h-lg gap-4">
      <MaxWidthWrapper>
        <div className="flex flex-col items-center">
          <div className="w-full flex justify-end mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-lightbrown text-text">Create Post</Button>
              </DialogTrigger>
              <DialogContent className="w-full">
                <DialogHeader>
                  <DialogTitle>Create Your Post</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <CreatePost />
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="w-full flex flex-col items-center gap-4">
            <PostList />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
