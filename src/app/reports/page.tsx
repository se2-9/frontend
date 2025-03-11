'use client';

import { useAuthStore } from '@/store/auth-store';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import AvatarDropdownProfile from '@/components/profile/avatar-dropdown-profile';
import { ReportsTable } from '@/components/reports/reports-table';
import { useReports } from '@/hooks/useReports';
import { Icons } from '@/components/icons';

export default function ReportsPage() {
  const user = useAuthStore((state) => state.user);
  const { data, isLoading } = useReports();

  if (isLoading) {
    return (
      <MaxWidthWrapper>
        <div className="h-[calc(100vh-80px)] grid place-items-center">
          <Icons.logo className="animate-spin" />
        </div>
      </MaxWidthWrapper>
    );
  }

  const reportsData = data?.result ?? [];

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
              items={[
                { label: 'Home', href: '/student' },
                { label: 'Reports' },
              ]}
              className="mt-4"
            />

            <h1 className="text-3xl font-semibold mb-6">User Reports</h1>
          </div>
        </div>

        {
          <div className="w-full space-y-6">
            {<ReportsTable data={reportsData} />}
          </div>
        }
      </div>
    </MaxWidthWrapper>
  );
}
