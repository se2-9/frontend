'use client';

import { Icons } from '@/components/icons';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import CreatePost from '@/components/posts/create-post';
import { PostMatchedList } from '@/components/posts/post-match-list';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMatchedPost } from '@/hooks/usePosts';
import { ScrollTextIcon } from 'lucide-react';



export default function Page() {
  const { data, isLoading } = useMatchedPost();

  if (isLoading) {
    return (
      <MaxWidthWrapper>
        <div className="h-[calc(100vh-80px)] grid place-items-center">
          <Icons.logo className="animate-spin" />
        </div>
      </MaxWidthWrapper>
    );
  }

  const hasPosts = data?.result && data.result.length > 0;

  return (
    <MaxWidthWrapper className="py-8">
      <div className="flex flex-col items-center">
        <div
          className={`w-full ${hasPosts ? 'mb-8' : 'h-[calc(100vh-160px)] flex flex-col justify-center'}`}
        >
          <Dialog>
            <DialogTrigger asChild>
              {!hasPosts && (
                <div className="text-center space-y-4">
                  <ScrollTextIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    No matched posts yet
                  </h2>
                </div>
              )}
            </DialogTrigger>
            <DialogContent
              className="sm:max-w-[425px]"
              aria-description="Create your post"
            >
              <DialogHeader>
                <DialogTitle>Create Your Post</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <CreatePost />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {hasPosts && (
          <div className="w-full space-y-6">
            {data.result ? <PostMatchedList posts={data.result} /> : null}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
