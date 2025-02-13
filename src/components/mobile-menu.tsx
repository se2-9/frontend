'use client';

import { useReducer } from 'react';
import { MenuIcon, PencilIcon } from 'lucide-react';
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
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

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
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="md:hidden"
        >
          <MenuIcon className="size-6" />
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
              <Badge
                className={cn('w-fit', {
                  'bg-orange': user.role === 'tutor',
                  'bg-blue': user.role === 'student',
                })}
              >
                {user.role === 'tutor' ? 'Tutor' : 'Student'}
              </Badge>
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
                href="/"
                onClick={toggle}
                className="hover:underline"
              >
                My students
              </Link>
              <Link
                href="/post/search"
                onClick={toggle}
                className="hover:underline"
              >
                Search posts
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-start space-y-2">
              <Link
                href="/learning"
                onClick={toggle}
                className="hover:underline"
              >
                Learning
              </Link>
              <Link
                href="/post"
                onClick={toggle}
                className="hover:underline"
              >
                Posts
              </Link>
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
