'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FilterIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { fetchPosts } from '@/lib/api/search';
import FilterForm from '@/components/search/filter-form';
import { FilterPostDTO, PostDTO } from '@/dtos/post';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { PostCard } from '@/components/posts/post-card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import AvatarDropdownProfile from '@/components/profile/avatar-dropdown-profile';
import { useAuthStore } from '@/store/auth-store';

export default function Page() {
  const user = useAuthStore((state) => state.user);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'Highest Rate' | 'Lowest Rate'>(
    'Highest Rate'
  );

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

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const p = await fetchPosts(form.getValues() as FilterPostDTO);
      return p?.result ?? [];
    },
    enabled: true,
  });

  const [filteredPosts, setFilteredPosts] = useState<PostDTO[]>(posts ?? []);

  function onRequest(postId: string, tutorId: string) {
    console.log('Requesting post', postId, 'from tutor', tutorId);
    toast.success('Request sent successfully');
  }

  useEffect(() => {
    if (posts) {
      const sortedPosts = [...posts];

      sortedPosts.sort((a, b) =>
        sortOrder === 'Highest Rate'
          ? b.hourly_rate - a.hourly_rate
          : a.hourly_rate - b.hourly_rate
      );

      setFilteredPosts(
        sortedPosts.filter(
          (post) =>
            post.title.toLowerCase().includes(search.toLowerCase()) ||
            post.subject.toLowerCase().includes(search.toLowerCase()) ||
            post.user?.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [sortOrder, search, posts]);

  if (isLoading) {
    return (
      <MaxWidthWrapper>
        <div className="h-[calc(100vh-80px)] grid place-items-center">
          <Icons.logo className="animate-spin" />
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col md:flex-row p-4 space-y-4 md:space-x-6">
      <div className="hidden lg:block w-[400px] sticky top-4 self-start mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <FilterForm
            refetch={refetch}
            form={form}
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-4">
          {user && <AvatarDropdownProfile user={user} />}
          <div className="flex flex-col">
            <Breadcrumbs
              items={[{ label: 'Home', href: '/tutor' }, { label: 'Search' }]}
              className="mt-4"
            />
            <h1 className="text-3xl font-semibold mb-6">
              Search Student Posts
            </h1>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* mobile filter popup */}
          <div className="lg:hidden flex items-center space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <FilterIcon size={16} /> Filter
                </Button>
              </DialogTrigger>
              <DialogContent>
                <FilterForm
                  refetch={refetch}
                  form={form}
                />
              </DialogContent>
            </Dialog>

            {/* search and sort */}
            <div className="flex w-full items-center space-x-2 my-4">
              <div className="relative w-full md:w-80">
                <Search
                  className="absolute left-3 top-3 text-gray-500"
                  size={18}
                />
                <Input
                  className="pl-10 pr-4 py-2 w-full rounded-md"
                  placeholder="Search by title, subject, or tutor..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Select
                value={sortOrder}
                onValueChange={(value) =>
                  setSortOrder(value as 'Highest Rate' | 'Lowest Rate')
                }
              >
                <SelectTrigger className="w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Highest Rate">Highest Rate</SelectItem>
                    <SelectItem value="Lowest Rate">Lowest Rate</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post: PostDTO) => (
              <PostCard
                key={`${post.user?.id}-${post.created_at}`}
                post={post}
                onRequest={onRequest}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No posts found.
            </p>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
