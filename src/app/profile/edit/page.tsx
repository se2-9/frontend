  'use client';

  import { useAuthStore } from '@/store/auth-store';
  import MaxWidthWrapper from '@/components/max-width-wrapper';
  import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
  } from '@/components/ui/card';
  import EditProfileForm from '@/components/profile/edit-profile-form';
  import ProfileHeader from '@/components/profile/edit-profile-header';
  import { Icons } from '@/components/icons';
  import EditAllCardForm from '@/components/profile/edit-all-card-form';

  export default function Dashboard() {
    const user = useAuthStore((state) => state.user);

    if (!user) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <Icons.logo className="h-6 w-6 animate-spin text-muted" />
        </div>
      );
    }

    return (
      <MaxWidthWrapper className="py-10">
        <div className="space-y-6">
          {/* Title Section */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">
              Account Settings
            </h1>
            <p className="text-muted-foreground text-sm">
              View and update your profile information.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Panel */}
            <Card className="md:col-span-1 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Profile Overview</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Basic account information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileHeader />
              </CardContent>
            </Card>

            {/* Right Panel */}
            <div className='md:col-span-2 space-y-4'>
              <Card className="md:col-span-2 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Edit Profile</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Make changes to your account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EditProfileForm />

                </CardContent>
              </Card>
              <Card className="md:col-span-2 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Edit Card Info</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Make changes to your card details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <EditAllCardForm />
                </CardContent>
              </Card>
            </div>
            
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

