import { Icons } from '@/components/icons';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Page() {
  return (
    <MaxWidthWrapper className="w-full mx-auto min-h-screen flex flex-col justify-center items-center gap-4 mt-8 md:mt-0 md:gap-20">
      <div className="flex flex-col gap-1 md:gap-6 justify-center items-center text-center text-text">
        <h1 className="text-3xl md:text-5xl font-bold font-noto_sans_th">
          Welcome to อย่าหาว่าพี่สอน
        </h1>
        <p>Connecting Learners with Expert Tutors worldwide</p>
      </div>

      <div className="grid place-items-center mx-auto grid-cols-1 md:grid-cols-2 text-text text-center line-clamp-4 gap-12 md:gap-44 mt-8">
        <div className="flex flex-col items-center justify-center max-w-md gap-2 md:gap-6">
          <Icons.welcomeTutor className="bg-orange w-32 h-32 p-4 rounded-lg" />
          <h1 className="font-bold text-lg">For Tutors</h1>
          <p>
            Join our community of expert tutors and share your knowledge with
            eager learners.
          </p>
          <Link
            className={cn(buttonVariants(), 'bg-orange text-text mt-8')}
            href="/register/tutor"
          >
            Register as a Tutors
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center max-w-md gap-2 md:gap-6">
          <Icons.welcomeStudent className="bg-blue w-32 h-32 p-4 rounded-lg" />
          <h1 className="font-bold text-lg">For Students</h1>
          <p>
            Find the perfect tutor to help you achieve your learning goals,
            anytime, anywhere.
          </p>
          <Link
            className={cn(buttonVariants(), 'bg-blue text-text mt-8')}
            href="/register/student"
          >
            Register as a Student
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
