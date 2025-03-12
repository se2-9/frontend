'use client';

import { Icons } from '@/components/icons';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import CreatePost from '@/components/posts/create-post';
import { PostMatchedList } from '@/components/posts/post-match-list';
import AvatarDropdownProfile from '@/components/profile/avatar-dropdown-profile';
import { ProfileCard } from '@/components/profile/profile-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useMatchedPost } from '@/hooks/usePosts';
import { useAuthStore } from '@/store/auth-store';
import { ScrollTextIcon } from 'lucide-react';

export default function Page() {
  const user = useAuthStore((state) => state.user);
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
    <MaxWidthWrapper className="w-full h-full flex flex-col md:flex-row p-6 space-y-6 md:space-x-8 mb-6">
      <div className="hidden lg:block w-[480px] sticky top-4 self-start mt-6">
        {user && <ProfileCard user={user} />}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center gap-4">
          {user && (
            <AvatarDropdownProfile
              className="lg:hidden"
              user={user}
            />
          )}
          <div className="flex flex-col">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/student' },
                { label: 'Match Posts' },
              ]}
              className="mt-4"
            />

            <h1 className="text-3xl font-semibold mb-6">Student Requests</h1>
          </div>
        </div>
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
