'use client';

import { useReducer } from 'react';
import {
  BookIcon,
  HomeIcon,
  MenuIcon,
  PencilIcon,
  SearchIcon,
  SendIcon,
  StarIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import Link from 'next/link';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';
import RoleBadge from './role-badge';

export default function MobileMenu() {
  const router = useRouter();
  const [isOpen, toggle] = useReducer((open) => !open, false);

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={toggle}
    >
      <SheetTrigger
        asChild
        className="hidden lg:flex lg:items-center lg:justify-center"
      >
        <Button
          variant="secondary"
          size="icon"
        >
          <MenuIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="mb-2">
        <SheetHeader>
          <SheetTitle className="text-center">อย่าหาว่าพี่สอน</SheetTitle>
          <SheetDescription className="sr-only">Navigation</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col space-y-4">
          {user ? (
            <>
              <div className="mt-4">
                <Link
                  href="/profile/edit"
                  className="flex items-center gap-4 hover:underline"
                >
                  <p className="font-bold">{user.name}</p>
                  <PencilIcon
                    className="h-4 w-4"
                    strokeWidth={3}
                  />
                </Link>
                <p>{user.email}</p>
              </div>
              <RoleBadge role={user.role} />
              <Link
                href={user.role === 'student' ? '/student' : '/tutor'}
                className="flex items-center gap-4 hover:underline"
              >
                <HomeIcon size={16} />
                <p>Home</p>
              </Link>
            </>
          ) : (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="bg-secondary-foreground text-primary-foreground hover:bg-secondary-foreground/70"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
          {user && user.role === 'tutor' ? (
            <div className="flex flex-col items-start space-y-2">
              <Link
                href="/tutor/search"
                onClick={toggle}
                className="hover:underline"
              >
                <div className="flex items-center gap-2">
                  <SearchIcon size={16} />
                  <p>Search posts</p>
                </div>
              </Link>
              <Link
                href="/tutor/requests"
                onClick={toggle}
                className="hover:underline"
              >
                <div className="flex items-center gap-2">
                  <SendIcon size={16} />
                  <p>Requests</p>
                </div>
              </Link>
              <Link
                href="/tutor/reviews"
                onClick={toggle}
                className="hover:underline"
              >
                <div className="flex items-center gap-2">
                  <StarIcon size={16} />
                  <p>Reviews</p>
                </div>
              </Link>
              <Link
                href="/reports"
                onClick={toggle}
                className="hover:underline"
              >
                <div className="flex items-center gap-2">
                  <TriangleAlertIcon size={16} />
                  <p>Reports</p>
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-start space-y-2">
              {user ? (
                <>
                  <Link
                    href="/student/posts"
                    onClick={toggle}
                    className="hover:underline"
                  >
                    <div className="flex items-center gap-2">
                      <BookIcon size={16} />
                      <p>Posts</p>
                    </div>
                  </Link>
                  <Link
                    href="/student/requests"
                    onClick={toggle}
                    className="hover:underline"
                  >
                    <div className="flex items-center gap-2">
                      <SendIcon size={16} />
                      <p>Request</p>
                    </div>
                  </Link>
                  <Link
                    href="/student/reviews"
                    onClick={toggle}
                    className="hover:underline"
                  >
                    <div className="flex items-center gap-2">
                      <StarIcon size={16} />
                      <p>Review</p>
                    </div>
                  </Link>
                  <Link
                    href="/reports"
                    onClick={toggle}
                    className="hover:underline"
                  >
                    <div className="flex items-center gap-2">
                      <TriangleAlertIcon size={16} />
                      <p>Report</p>
                    </div>
                  </Link>
                </>
              ) : null}
            </div>
          )}
          {user ? (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="text-primary bg-destructive/50 w-full"
              onClick={() => {
                logout();
                toggle();
                router.replace('/login');
              }}
            >
              <p>Logout</p>
            </Button>
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
