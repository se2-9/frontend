'use client';

import Link from 'next/link';
import MaxWidthWrapper from './max-width-wrapper';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from './ui/button';
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
import {
  BookIcon,
  Edit2Icon,
  SearchIcon,
  SendIcon,
  Users2Icon,
} from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="sticky z-50 top-0 inset-x-0 h-16 !backdrop-blur-lg bg-lightbrown/50">
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
                      <div className="flex items-center gap-2">
                        <Edit2Icon className="h-4 w-4" />
                        <Link href="/profile/edit">Edit profile</Link>
                      </div>
                    </DropdownMenuItem>
                    {user.role === 'student' ? (
                      <>
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2">
                            <BookIcon size={16} />
                            <Link href="/learning">Learning</Link>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <div className="flex items-center gap-2">
                            <SendIcon size={16} />
                            <Link href="/post">Posts</Link>
                          </div>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <div className="flex items-center gap-2">
                            <SearchIcon size={16} />
                            <Link href="/post/search">Find students</Link>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <div className="flex items-center gap-2">
                            <Users2Icon size={16} />
                            <Link href="/">My students</Link>
                          </div>
                        </DropdownMenuItem>
                      </>
                    )}
                    <Separator />
                    <DropdownMenuItem
                      asChild
                      className="p-0"
                    >
                      <Button
                        className="w-full bg-destructive/70 hover:!bg-destructive hover:!text-background focus:ring-0 hover:ring-0 hover:border-none"
                        size="sm"
                        onClick={async () => {
                          await logout();
                          router.replace('/login');
                        }}
                      >
                        Logout
                      </Button>
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
