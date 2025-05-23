'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { useAuthStore } from '@/store/auth-store';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import AvatarDropdownProfile from '@/components/profile/avatar-dropdown-profile';
import { getAllRequestSentByTutor } from '@/lib/api/request';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { RequestsTable } from '@/components/requests/requests-table';

export default function TutorRequestsPage() {
  const user = useAuthStore((state) => state.user);
  const {
    data: requests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const r = await getAllRequestSentByTutor();
      return r?.result ?? [];
    },
    enabled: true,
  });

  if (isLoading) {
    return (
      <MaxWidthWrapper>
        <div className="h-[calc(100vh-80px)] grid place-items-center">
          <Icons.logo className="animate-spin" />
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col md:flex-row p-6 space-y-6 md:space-x-8 mb-6">
      <div className="hidden lg:block w-[480px] sticky top-4 self-start mt-6">
        {user && <ProfileCard user={user} />}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center gap-4">
          {user && (
            <AvatarDropdownProfile
              className="lg:hidden"
              user={user}
            />
          )}
          <div className="flex flex-col">
            <Breadcrumbs
              items={[{ label: 'Home', href: '/tutor' }, { label: 'Requests' }]}
              className="mt-4"
            />

            <h1 className="text-3xl font-semibold mb-6">My Requests</h1>
          </div>
        </div>

        {requests != null ? (
          <RequestsTable
            data={requests}
            refetch={refetch}
            isTutor={true}
          />
        ) : (
          <MaxWidthWrapper>
            <div className="h-[calc(100vh-80px)] grid place-items-center">
              <Icons.logo className="animate-spin" />
            </div>
          </MaxWidthWrapper>
        )}
      </div>
    </MaxWidthWrapper>
  );
}
