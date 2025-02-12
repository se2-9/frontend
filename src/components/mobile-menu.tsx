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
            <div className="py-2">
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
          <Link
            href="/post"
            onClick={toggle}
            className="hover:underline"
          >
            Posts
          </Link>
          <Link
            href="/"
            onClick={toggle}
            className="hover:underline"
          >
            Learning
          </Link>
          {user && user.role === 'tutor' && (
            <Link
              href="/"
              onClick={toggle}
              className="hover:underline"
            >
              Students
            </Link>
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
