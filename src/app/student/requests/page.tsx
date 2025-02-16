'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/store/auth-store';
import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { RequestsTable } from '@/components/requests/requests-table';
import { RequestDTO } from '@/dtos/request';

export default function StudentRequestsPage() {
  const user = useAuthStore((state) => state.user);

  const requestsFromTutors: RequestDTO[] = useMemo(
    () => [
      {
        id: '1',
        tutor_id: 'John Doe',
        student_id: 'Alice Smith',
        post_id: '1',
        created_at: '2024-02-01',
        status: 'pending',
      },
      {
        id: '2',
        tutor_id: 'Alice Smith',
        student_id: 'John Doe',
        post_id: '2',
        created_at: '2024-01-29',
        status: 'not paid',
      },
      {
        id: '3',
        tutor_id: 'Michael Lee',
        student_id: 'John Doe',
        post_id: '3',
        created_at: '2024-01-27',
        status: 'paid',
      },
      {
        id: '4',
        tutor_id: 'Michael Lee',
        student_id: 'John Doe',
        post_id: '3',
        created_at: '2024-01-27',
        status: 'payment failed',
      },
      {
        id: '5',
        tutor_id: 'Michael Lee',
        student_id: 'John Doe',
        post_id: '3',
        created_at: '2024-01-27',
        status: 'replaced',
      },
      {
        id: '6',
        tutor_id: 'Michael Lee',
        student_id: 'John Doe',
        post_id: '3',
        created_at: '2024-01-27',
        status: 'cancelled',
      },
      {
        id: '7',
        tutor_id: 'Michael Lee',
        student_id: 'John Doe',
        post_id: '3',
        created_at: '2024-01-27',
        status: 'processing other',
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
        <Breadcrumbs
          items={[{ label: 'Home', href: '/student' }, { label: 'Requests' }]}
          className="mt-4"
        />

        <h1 className="text-3xl font-semibold mb-6">Requests from Tutors</h1>

        <RequestsTable data={requestsFromTutors} />
      </div>
    </MaxWidthWrapper>
  );
}
