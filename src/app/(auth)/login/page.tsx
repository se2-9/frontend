import LoginForm from '@/components/auth/login-form';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Page() {
  return (
    <MaxWidthWrapper className="w-full h-screen flex flex-col items-center justify-center text-text">
      <Card className="w-full max-w-md bg-background py-2">
        <CardHeader className="px-10">
          <p className="text-xl mb-2 font-medium">Welcome !</p>
          <CardTitle className="text-2xl">Sign in to</CardTitle>
          <CardDescription className="font-bold">
            อย่าหาว่าพี่สอน
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="px-10">
          <Link
            className={cn('w-full text-center hover:underline mt-10 text-sm')}
            href="/"
          >
            Don&apos;t have an account?{'  '}
            <span className="font-bold hover:underline">Register</span>
          </Link>
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
}
