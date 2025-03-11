'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { useAuthStore } from '@/store/auth-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import AvatarDropdownProfile from '@/components/profile/avatar-dropdown-profile';
import { getAllRequestSentByTutor } from '@/lib/api/request';
import { useQuery } from '@tanstack/react-query';
import { Icons } from '@/components/icons';
import { RequestDTO } from '@/dtos/request';

export default function TutorRequestsPage() {
  const user = useAuthStore((state) => state.user);

  const { data: sentRequests, isLoading } = useQuery<RequestDTO[]>({
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
          {user && <AvatarDropdownProfile user={user} />}
          <div className="flex flex-col">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/tutor' },
                { label: 'Tutor Requests' },
              ]}
              className="mt-4"
            />
            <h1 className="text-3xl font-semibold mb-6">Tutor Dashboard</h1>
          </div>
        </div>

        <Tabs defaultValue="pending">
          <TabsList className="grid grid-cols-5 w-full bg-gray-100 p-2 rounded-lg">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="not-paid">Not Paid</TabsTrigger>
            <TabsTrigger value="paid">Paid</TabsTrigger>
            <TabsTrigger value="payment-failed">Payment Failed</TabsTrigger>
            <TabsTrigger value="replaced">Replaced</TabsTrigger>
          </TabsList>

          {['pending', 'Not Paid', 'Paid', 'Payment Failed', 'Replaced'].map(
            (status) => (
              <TabsContent
                key={status}
                value={status.toLowerCase().replace(' ', '-')}
              >
                {sentRequests &&
                sentRequests.filter((req) => req.status === status).length >
                  0 ? (
                  sentRequests
                    .filter((req) => req.status === status)
                    .map((req) => (
                      <div
                        key={req.id}
                        className="p-4 border rounded-lg shadow-md bg-white hover:bg-gray-50 transition-all duration-200 mb-3 flex justify-between items-center"
                      >
                        <div>
                          <h3 className="text-lg font-semibold">
                            {req.student_id}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Requested on: {req.created_at}
                          </p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            status === 'paid'
                              ? 'bg-green-100 text-green-600'
                              : status === 'Payment Failed'
                                ? 'bg-red-100 text-red-600'
                                : status === 'Not Paid'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : status === 'Replaced'
                                    ? 'bg-gray-100 text-gray-600'
                                    : 'bg-blue-100 text-blue-600'
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
            )
          )}
        </Tabs>
      </div>
    </MaxWidthWrapper>
  );
}
