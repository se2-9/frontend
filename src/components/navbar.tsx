'use client';

import Link from 'next/link';
import MaxWidthWrapper from './max-width-wrapper';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Separator } from './ui/separator';
import MobileMenu from './mobile-menu';
import { useAuthStore } from '@/store/auth-store';
import { Icons } from './icons';

export default function Navbar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="sticky z-50 top-0 inset-x-0 h-16 backdrop-blur-lg bg-lightbrown">
      <header className="relative border-b">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center justify-between text-text">
            {/* left */}
            <div className="ml-4 flex items-center gap-2 lg:ml-0">
              <Link
                href="/"
                className="flex items-center gap-2 mr-4 font-bold"
              >
                <div className="flex items-center gap-4">
                  <Icons.logo className="h-8 w-8" />
                  <p className="font-bold">อย่าหาว่าพี่สอน</p>
                </div>
              </Link>
            </div>
            {/* rights */}
            <div className="hidden md:ml-4 md:flex items-center gap-2 lg:ml-0">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* <Button variant="ghost" size="icon"> */}
                    <Avatar>
                      <AvatarImage
                        src=""
                        alt={user.email}
                      />
                      <AvatarFallback>{user.email[0]}</AvatarFallback>
                    </Avatar>
                    {/* </Button> */}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                      <DropdownMenuLabel className="-mt-3 font-normal text-sm">
                        macgeargear@gmail.com
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <Separator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>My students</DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                      }}
                    >
                      logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-8 items-center">
                  <Link
                    href="/login"
                    className={cn(
                      'bg-background',
                      buttonVariants({ variant: 'ghost' })
                    )}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={cn(
                      'bg-background',
                      buttonVariants({ variant: 'ghost' })
                    )}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
            <MobileMenu />
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
