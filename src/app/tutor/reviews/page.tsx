'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useAuthStore } from '@/store/auth-store';
import { MessageSquare, Search } from 'lucide-react';
import { getTutorReviewsByTutorID } from '@/lib/api/review';
import { useQuery } from '@tanstack/react-query';
import { ReviewDTO } from '@/dtos/review';
import ReviewCard from '@/components/review/review-card';
import ReviewsLoadingSkeleton from '@/components/review/review-loading-skeleton';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function TutorReviewsPage() {
  const user = useAuthStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: tutorReviews, isLoading } = useQuery<ReviewDTO[]>({
    queryKey: ['tutor-reviews', user?.id],
    queryFn: async () => {
      const r = await getTutorReviewsByTutorID(user?.id!);
      return r?.result ?? [];
    },
    enabled: !!user?.id,
  });

  const filteredReviews = tutorReviews?.filter(
    (review) =>
      review.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.student_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col md:flex-row p-4 md:p-6 space-y-6 md:space-y-0 md:space-x-8 mb-6">
      <div className="hidden lg:block w-[320px] sticky top-4 self-start mt-6">
        {user && <ProfileCard user={user} />}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <Breadcrumbs
              items={[{ label: 'Home', href: '/tutor' }, { label: 'Reviews' }]}
            />
            <h1 className="text-2xl md:text-3xl font-bold mt-2">My Reviews</h1>
          </div>

          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reviews..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <ReviewsLoadingSkeleton />
        ) : filteredReviews && filteredReviews.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
              />
            ))}
          </div>
        ) : (
          <EmptyReviewsState
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
}

function EmptyReviewsState({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-muted/20">
      <div className="rounded-full bg-primary/10 p-3 mb-4">
        <MessageSquare className="h-6 w-6 text-primary" />
      </div>
      {searchTerm ? (
        <>
          <h3 className="text-xl font-semibold">No matching reviews</h3>
          <p className="text-muted-foreground mt-2 mb-4">
            We couldn&apos;t find any reviews matching &quot;{searchTerm}&quot;
          </p>
          <button
            onClick={() => setSearchTerm('')}
            className="text-primary hover:underline"
          >
            Clear search
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold">No reviews yet</h3>
          <p className="text-muted-foreground mt-2">
            When students leave reviews, they&apos;ll appear here.
          </p>
        </>
      )}
    </div>
  );
}
