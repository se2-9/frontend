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
import EditProfileForm from '@/components/profile/edit-profile-form';
import ProfileHeader from '@/components/profile/profile-header';
export default function DashBoard() {
  const user = useAuthStore((state) => state.user);

  if (user == null) {
    return (
      <div className="min-h-screen grid place-content-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col items-center justify-center p-4 space-y-2">
      {/* <Card className="w-full max-w-lg bg-background py-2">
        <CardHeader className="px-10">
          <CardTitle className="text-2xl">Profile Page</CardTitle>
          <CardDescription className="font-bold">
          </CardDescription>
        </CardHeader>
        <CardContent>
              <ProfileHeader />
        </CardContent>
      </Card> */}
      <Card className="w-full max-w-lg bg-background py-2">
        <CardHeader className="px-10">
          <CardTitle className="text-2xl">Edit Profile Page</CardTitle>
          <CardDescription className="font-bold">
            Information
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ProfileHeader /> 
          <EditProfileForm />   
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
      
    </MaxWidthWrapper>
  );
}
