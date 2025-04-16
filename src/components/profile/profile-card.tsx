'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Mail,
  Edit,
  Calendar,
  PhoneCallIcon,
  GraduationCap,
  BookTextIcon,
} from 'lucide-react';
import RoleBadge from '../role-badge';
import { User } from '@/types/user';
import { Icons } from '../icons';
import { logout } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProfileCardProps {
  user: User;
}

export function ProfileCard({ user }: ProfileCardProps) {
  const router = useRouter();
  return (
    <Card className="w-full mx-auto shadow-sm border bg-white">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={''}
            alt={user.name || 'User'}
          />
          <AvatarFallback>
            {user.name ? user.name.charAt(0).toUpperCase() : '?'}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{user.name || 'Unknown User'}</h2>
          <RoleBadge role={user.role || 'student'} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>
            <strong>Email:</strong> {user.email}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>
            <strong>Date of birth: </strong>{' '}
            {new Date(user.dateOfBirth).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          {user.gender === 'male' ? <Icons.male /> : <Icons.female />}
          <span>
            <strong>Gender: </strong> {user.gender}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <PhoneCallIcon className="h-4 w-4" />
          <span>
            <strong>Phone number: </strong> {user.phoneNumber}
          </span>
        </div>
        {user.role === 'tutor' && <div className="flex items-center space-x-2 text-sm text-gray-600">
          <BookTextIcon className="h-4 w-4" />
          <span>
            <strong>Portfolio: </strong> {user.tutorPortfolio}
          </span>
        </div>}
        {user.role === 'tutor' && <div className="flex items-center space-x-2 text-sm text-gray-600">
          <GraduationCap className="h-4 w-4" />
          <span>
            <strong>Education Level: </strong> {user.tutorEducationLevel}
          </span>
        </div>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/profile/edit">
          <Button
            variant="outline"
            size="sm"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </Link>
        <Button
          className="w-fit px-4 bg-destructive/70 hover:!bg-destructive hover:!text-background focus:ring-0 hover:ring-0 hover:border-none"
          size="sm"
          onClick={async () => {
            await logout();
            router.replace('/login');
          }}
        >
          Logout
        </Button>
      </CardFooter>
    </Card>
  );
}
