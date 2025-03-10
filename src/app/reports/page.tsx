'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/store/auth-store';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import AvatarDropdownProfile from '@/components/profile/avatar-dropdown-profile';
import { ReportsTable } from '@/components/reports/reports-table';
import { ReportDTO } from '@/dtos/report';

export default function ReportsPage() {
  const user = useAuthStore((state) => state.user);

  const reportsFromUser: ReportDTO[] = useMemo(
    () => [
      {
        report_id: '1',
        user_id: 'John Doe',
        content: 'Test 1',
        created_at: '2024-02-01',
        status: 'pending',
      },
      {
        report_id: '2',
        user_id: 'Alice Smith',
        content: 'Test 2',
        created_at: '2024-01-29',
        status: 'not paid',
      },
      {
        report_id: '3',
        user_id: 'Michael Lee',
        content: 'Test 3',
        created_at: '2024-01-27',
        status: 'resolved',
      },
      {
        report_id: '4',
        user_id: 'Michael Lee',
        content: 'Test 4',
        created_at: '2024-01-27',
        status: 'rejected',
      },
    ],
    []
  );

  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col md:flex-row p-6 space-y-6 md:space-x-8 mb-6">
      <div className="hidden lg:block w-[480px] sticky top-4 self-start mt-6">
        {user && <ProfileCard user={user} />}
      </div>

      <div className="flex flex-col w-full">
        <div className="flex items-center gap-4">
          {user && <AvatarDropdownProfile user={user} />}
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

        <ReportsTable data={reportsFromUser} />
      </div>
    </MaxWidthWrapper>
  );
}
