'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import { ProfileCard } from '@/components/profile/profile-card';
import { useAuthStore } from '@/store/auth-store';
import Link from 'next/link';
import { Send, ClipboardList, Users, FileText, AlertTriangle } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import AvatarDropdownProfile from '@/components/profile/avatar-dropdown-profile';

export default function Page() {
  const user = useAuthStore((state) => state.user);

  const stats = {
    requestsFromTutors: 8,
    matchedPosts: 4,
    activeTutors: 6,
    myPosts: 5,
  };

  const quickLinks = [
    {
      href: '/student/posts',
      icon: <FileText className="w-6 h-6 text-purple-600" />,
      title: 'View My Posts',
      description:
        'Manage and review posts that you have created for tutoring requests.',
    },
    {
      href: '/student/requests',
      icon: <Send className="w-6 h-6 text-green-600" />,
      title: 'View Requests from Tutors',
      description: 'See tutors who have requested to teach you.',
    },
    {
      href: '/student/matches',
      icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
      title: 'Review Matched Posts',
      description:
        'Check posts that have been successfully matched with tutors.',
    },
    {
      href: '/report',
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
          {user && <AvatarDropdownProfile user={user} />}
          <div className="flex flex-col">
            <Breadcrumbs
              items={[{ label: 'Home' }]}
              className="mt-4"
            />

            <h1 className="text-3xl font-semibold mb-6">Student Dashboard</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="p-4 border rounded-lg shadow-sm flex items-center space-x-3">
            <Send className="text-green-600 w-6 h-6" />
            <div>
              <p className="text-lg font-bold">{stats.requestsFromTutors}</p>
              <p className="text-sm text-gray-500">Requests from Tutors</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-sm flex items-center space-x-3">
            <ClipboardList className="text-blue-600 w-6 h-6" />
            <div>
              <p className="text-lg font-bold">{stats.matchedPosts}</p>
              <p className="text-sm text-gray-500">Matched Posts</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-sm flex items-center space-x-3">
            <Users className="text-purple-600 w-6 h-6" />
            <div>
              <p className="text-lg font-bold">{stats.activeTutors}</p>
              <p className="text-sm text-gray-500">Active Tutors</p>
            </div>
          </div>
          <div className="p-4 border rounded-lg shadow-sm flex items-center space-x-3">
            <FileText className="text-purple-600 w-6 h-6" />
            <div>
              <p className="text-lg font-bold">{stats.myPosts}</p>
              <p className="text-sm text-gray-500">My Posts</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group"
            >
              <div className="p-5 border rounded-lg shadow-md flex items-center space-x-4 bg-white hover:bg-gray-100 transition-all duration-200 cursor-pointer">
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
