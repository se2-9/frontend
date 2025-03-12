import { Skeleton } from '../ui/skeleton';

export default function ReviewsLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="p-5 border rounded-lg"
        >
          <div className="flex items-start space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}
