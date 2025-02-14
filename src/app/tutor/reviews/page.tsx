'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useAuthStore } from '@/store/auth-store';
import { Star, Calendar } from 'lucide-react';

export default function TutorReviewsPage() {
  const user = useAuthStore((state) => state.user);

  const reviews = [
    {
      id: '1',
      studentName: 'Alex Johnson',
      subject: 'Math',
      rating: 5,
      date: '2024-02-01',
      description: 'Great tutor! Helped me understand algebra very well.',
    },
    {
      id: '2',
      studentName: 'Emily Davis',
      subject: 'English',
      rating: 4,
      date: '2024-01-29',
      description: 'Good lessons, but sometimes a bit fast-paced.',
    },
    {
      id: '3',
      studentName: 'Michael Smith',
      subject: 'Science',
      rating: 5,
      date: '2024-01-27',
      description: 'Very knowledgeable and patient. Highly recommended!',
    },
    {
      id: '4',
      studentName: 'Sophia Williams',
      subject: 'History',
      rating: 3,
      date: '2024-02-05',
      description:
        'The explanations were clear, but I needed more practice examples.',
    },
  ];

  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col md:flex-row p-6 space-y-6 md:space-x-8 mb-6">
      <div className="hidden lg:block w-[480px] sticky top-4 self-start mt-6">
        {user && <ProfileCard user={user} />}
      </div>

      <div className="flex flex-col w-full">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/tutor' }, { label: 'Reviews' }]}
        />

        <h1 className="text-3xl font-semibold mb-6">My Reviews</h1>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="p-5 border rounded-lg shadow-sm mb-4 bg-white hover:bg-gray-50 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold">{review.studentName}</h3>
              <p className="text-sm text-gray-600">Subject: {review.subject}</p>

              <div className="flex space-x-1 my-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{review.date}</span>
              </div>

              <p className="mt-2 text-gray-700">{review.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
