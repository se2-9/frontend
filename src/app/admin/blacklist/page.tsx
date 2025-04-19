'use client';

import { fetchAllBlacklist } from '@/lib/api/admin';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useAuthStore } from '@/store/auth-store';
import AvatarDropdownProfile from '@/components/profile/avatar-dropdown-profile';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import BlacklistTable from '@/components/blacklist/blacklist-table';

export default function BlacklistPage() {
  const user = useAuthStore((state) => state.user);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['blacklist'],
    queryFn: async () => {
      const r = await fetchAllBlacklist();
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
    <MaxWidthWrapper className='className="w-full h-full flex flex-col md:flex-row p-6 space-y-6 md:space-x-8 mb-6'>
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
              items={[
                { label: 'Home', href: `/${user?.role}` },
                { label: 'Blacklist' },
              ]}
              className="mt-4"
            />

            <h1 className="text-3xl font-semibold mb-6">Blacklist Users</h1>
          </div>
        </div>

        <div className="w-full space-y-6">
          {data != null ? (
            <BlacklistTable
              data={data}
              refetch={refetch}
            />
          ) : (
            <MaxWidthWrapper>
              <div className="h-[calc(100vh-80px)] grid place-items-center">
                <Icons.logo className="animate-spin" />
              </div>
            </MaxWidthWrapper>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
