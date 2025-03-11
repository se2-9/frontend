'use client';

import { useEffect, useState } from "react";
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useAuthStore } from '@/store/auth-store';
import { Star, Calendar } from 'lucide-react';
import { fetchTutorRatings } from "@/lib/api/post";

export default function TutorReviewsPage() {
  const user = useAuthStore((state) => state.user);

  const [reviews, setReviews] = useState<
  { studentName: string; subject: string; rating: number; date: string; description: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (user && typeof user.id === "string") {
        try {
          const { reviews } = await fetchTutorRatings(user.id);
          setReviews(reviews);
        } catch (error) {
          setError("No reviews yet.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user]);

  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col md:flex-row p-6 space-y-6 md:space-x-8 mb-6">
      <div className="hidden lg:block w-[480px] sticky top-4 self-start mt-6">
        {user && <ProfileCard user={user} />}
      </div>

      <div className="flex flex-col w-full">
        <Breadcrumbs items={[{ label: "Home", href: "/tutor" }, { label: "Reviews" }]} />
        <h1 className="text-3xl font-semibold mb-6">My Reviews</h1>

        {/* Handle Loading & Error States */}
        {loading ? (
          <p className="text-gray-500">Loading reviews...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.date + review.studentName}
              className="p-5 border rounded-lg shadow-sm mb-4 bg-white hover:bg-gray-50 transition-all duration-200"
            >
              <h3 className="text-lg font-semibold">{review.studentName}</h3>
              <p className="text-sm text-gray-600">Subject: {review.subject}</p>

              {/* Dynamic Star Ratings */}
              <div className="flex space-x-1 my-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${index < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>

              <div className="flex items-center space-x-2 text-gray-600 text-sm">
                <Calendar className="w-4 h-4" />
                <span>{new Date(review.date).toLocaleDateString()}</span>
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