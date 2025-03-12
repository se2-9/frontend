import { Calendar, MessageSquare, Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ReviewDTO } from '@/dtos/review';

export default function ReviewCard({ review }: { review: ReviewDTO }) {
  const { post } = review;

  return (
    <Card className="w-full bg-card hover:shadow-lg transition-all duration-200 bg-white">
      {/* Header: Student Info */}
      <CardHeader className="flex flex-row justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage
              src={`/placeholder.svg?height=40&width=40`}
              alt="Student"
            />
            <AvatarFallback>{review.post.user?.name}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold">
              Student {review.post.user?.name}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <Calendar className="w-4 h-4 mr-1" />
              <span>
                {new Date(review.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <Separator />

      {/* Post details */}
      <CardContent className="p-4">
        <h4 className="font-semibold text-sm">{post.title}</h4>
        <p className="text-muted-foreground text-xs">
          {post.description || 'No description available.'}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-sm text-muted-foreground">
            Tutor: {post.tutor_gender || 'N/A'}
          </span>
          <span className="text-sm font-medium">${post.hourly_rate}/hour</span>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-col items-start p-4 space-y-2">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              fill={index < review.rating ? 'currentColor' : 'none'}
              className={`w-5 h-5 ${index < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
            />
          ))}
        </div>

        <div className="flex space-x-2 mt-1 items-center">
          <MessageSquare className="w-5 h-5 text-muted-foreground mt-1" />
          <p className="text-gray-700 text-sm">
            {review.subject || 'No additional comments provided.'}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
