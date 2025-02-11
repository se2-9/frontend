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
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
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
                    <Avatar>
                      <AvatarImage
                        src=""
                        alt={user.email}
                      />
                      <AvatarFallback>{user && user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuGroup className="space-y-2">
                      <DropdownMenuLabel className="flex items-center gap-2">
                        <p>{user.name}</p>
                        <Badge
                          className={cn('w-fit text-text', {
                            'bg-orange': user.role === 'tutor',
                            'bg-blue': user.role === 'student',
                          })}
                        >
                          {user.role}
                        </Badge>
                      </DropdownMenuLabel>
                      <DropdownMenuLabel className="-mt-3 font-normal text-sm">
                        {user.email}
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <Separator />
                    <DropdownMenuItem asChild>
                      <Link href="/post">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>My students</DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        router.replace('/post');
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
                    href="/"
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
