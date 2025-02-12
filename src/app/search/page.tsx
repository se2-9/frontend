'use client';

import { useEffect, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { FilterIcon, Search } from 'lucide-react';

export default function PostPage() {
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'Highest Rate' | 'Lowest Rate'>(
    'Highest Rate'
  );
  const [filteredPosts, setFilteredPosts] = useState<PostDTO[]>([]);

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

  const { data: posts, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const p = await fetchPosts(form.getValues() as FilterPostDTO);
      return p?.result ?? [];
    },
    enabled: false,
  });

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
            post.username.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [sortOrder, search, posts]);

  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col md:flex-row p-4 space-y-4 md:space-x-6">
      {/* Sidebar Filter (large screen) */}
      <aside className="hidden lg:block max-w-md bg-white rounded-lg shadow-md p-6 h-fit my-auto">
        <FilterForm
          refetch={refetch}
          form={form}
        />
      </aside>

      <div className="flex-1 space-y-4">
        {/* Mobile Filter Dialog */}
        <div className="lg:hidden flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 mr-4"
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

          {/* Search & Sorting */}
          <div className="flex w-full items-center justify-between space-x-2">
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

        {/* Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post: PostDTO) => (
              <PostCard
                key={`${post.user_id}-${post.created_at}`}
                post={post}
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
