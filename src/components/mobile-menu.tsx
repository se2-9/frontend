'use client';

import { useReducer } from 'react';
import { MenuIcon } from 'lucide-react';
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

export default function MobileMenu() {
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
              <span>{user.email}</span>
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
          <Link
            href="/"
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
          <Link
            href="/"
            onClick={toggle}
            className="hover:underline"
          >
            Students
          </Link>
          {user ? (
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="text-primary bg-destructive/50 w-full"
              onClick={() => {
                logout();
                toggle();
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
