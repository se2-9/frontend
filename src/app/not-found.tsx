import MaxWidthWrapper from '@/components/max-width-wrapper';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HomeIcon } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <MaxWidthWrapper>
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-gray-700">404</h1>
          <h2 className="mt-4 text-3xl font-semibold text-gray-800">
            Page Not Found
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Oops! The page you&apos;re looking for doesn&apos;t exist
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link
              href="/"
              className={cn(buttonVariants(), 'bg-lightbrown text-foreground')}
            >
              <HomeIcon className="mr-2 h-4 w-4" />
              Go to Homepage
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
