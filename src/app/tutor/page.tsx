'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { useAuthStore } from '@/store/auth-store';
import Link from 'next/link';
import { Mail, Star, Users, Search, Send, AlertTriangle } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import AvatarDropdownProfile from '@/components/profile/avatar-dropdown-profile';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  const stats = {
    totalRequests: 15,
    pendingRequests: 5,
    totalReviews: 12,
    activeStudents: 8,
  };

  const quickLinks = [
    {
      href: '/tutor/search',
      icon: <Search className="w-6 h-6 text-blue-600" />,
      title: 'Search Student Posts',
      description: 'Find and connect with students looking for tutors.',
    },
    {
      href: '/tutor/requests',
      icon: <Send className="w-6 h-6 text-green-600" />,
      title: 'View Requests Sent',
      description: 'Manage your pending and accepted tutoring requests.',
    },
    {
      href: '/tutor/reviews',
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      title: 'View Reviews',
      description: 'See feedback from students about your tutoring sessions.',
    },
    {
      href: '/reports',
      icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
      title: 'View Report',
      description: 'Send inquiry for problem occuring in the platform',
    },
  ];

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
              items={[{ label: 'Home' }]}
              className="mt-4"
            />
            <h1 className="text-3xl font-semibold mb-6">Tutor Dashboard</h1>
          </div>
        </div>

        {/* dash board stat */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 border rounded-lg shadow-sm flex items-center space-x-3 bg-white">
            <Mail className="text-blue-600 w-6 h-6" />
            <div>
              <p className="text-lg font-bold">{stats.totalRequests}</p>
              <p className="text-sm text-gray-500">Total Requests</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-sm flex items-center space-x-3 bg-white">
            <Star className="text-yellow-500 w-6 h-6" />
            <div>
              <p className="text-lg font-bold">{stats.totalReviews}</p>
              <p className="text-sm text-gray-500">Reviews</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-sm flex items-center space-x-3 bg-white">
            <Users className="text-green-600 w-6 h-6" />
            <div>
              <p className="text-lg font-bold">{stats.activeStudents}</p>
              <p className="text-sm text-gray-500">Active Students</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group h-full"
            >
              <div className="p-5 border rounded-lg shadow-md flex items-start space-x-4 bg-white hover:bg-gray-100 transition-all duration-200 cursor-pointer h-full">
                {link.icon}
                <div>
                  <h3 className="text-lg font-semibold">{link.title}</h3>
                  <p className="text-sm text-gray-500">{link.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
