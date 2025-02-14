'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { useAuthStore } from '@/store/auth-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';

export default function StudentRequestsPage() {
  const user = useAuthStore((state) => state.user);

  const requestsFromTutors = [
    { id: '1', tutorName: 'John Doe', date: '2024-02-01', status: 'Not Paid' },
    {
      id: '2',
      tutorName: 'Alice Smith',
      date: '2024-01-29',
      status: 'Accepted',
    },
    { id: '3', tutorName: 'Michael Lee', date: '2024-01-27', status: 'Paid' },
  ];

  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col md:flex-row p-6 space-y-6 md:space-x-8 mb-6">
      <div className="hidden lg:block w-[480px] sticky top-4 self-start mt-6">
        {user && <ProfileCard user={user} />}
      </div>

      <div className="flex flex-col w-full">
        <Breadcrumbs
          items={[{ label: 'Home', href: '/student' }, { label: 'Search' }]}
          className="mt-4"
        />

        <h1 className="text-3xl font-semibold mb-6">Requests from Tutors</h1>

        <Tabs defaultValue="not-paid">
          <TabsList className="grid grid-cols-3 w-full bg-gray-100 p-2 rounded-lg">
            <TabsTrigger value="not-paid">Not Paid</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
          </TabsList>

          {['Not Paid', 'Accepted', 'Paid'].map((status) => (
            <TabsContent
              key={status}
              value={status.toLowerCase()}
            >
              {requestsFromTutors.filter((req) => req.status === status)
                .length > 0 ? (
                requestsFromTutors
                  .filter((req) => req.status === status)
                  .map((req) => (
                    <div
                      key={req.id}
                      className="p-4 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition-all duration-200 mb-3 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="text-lg font-semibold">
                          {req.tutorName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Received on: {req.date}
                        </p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          status === 'Paid'
                            ? 'bg-green-100 text-green-600'
                            : status === 'Accepted'
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-yellow-100 text-yellow-600'
                        }`}
                      >
                        {status}
                      </div>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500">No requests in this status.</p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MaxWidthWrapper>
  );
}
