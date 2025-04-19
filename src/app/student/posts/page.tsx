'use client';

import { Icons } from '@/components/icons';
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
import { PlusIcon, ScrollTextIcon } from 'lucide-react';

export default function Page() {
  const { data, isLoading } = usePosts();

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
              {hasPosts ? (
                <div className="flex justify-center">
                  <Button className="bg-app-lightbrown text-lightbrown-foreground hover:text-white">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create Post
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <ScrollTextIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold text-foreground">
                    No posts yet
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Create your first post to get started!
                  </p>
                  <Button className="bg-app-lightbrown text-lightbrown-foreground transition-colors">
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create Post
                  </Button>
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
            {data.result ? <PostList posts={data.result} /> : null}
          </div>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
