'use client';

import { useAuthStore } from '@/store/auth-store';
import { Loader2Icon } from 'lucide-react';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ProfileCard from '@/components/profile/profile-card';
export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (user == null) {
    return (
      <div className="min-h-screen grid place-content-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <MaxWidthWrapper className="w-full h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-md bg-background py-2">
        <CardHeader className="px-10">
          <CardTitle className="text-2xl">Profile Page</CardTitle>
          <CardDescription className="font-bold">
            อย่าหาว่าพี่สอน
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ProfileCard />   
        </CardContent>
        <CardFooter>
          This is card footer
        </CardFooter>
      </Card>
    </MaxWidthWrapper>
  );
}
