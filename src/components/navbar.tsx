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
import { useRouter } from 'next/navigation';
import {
  BookIcon,
  Edit2Icon,
  HomeIcon,
  SearchIcon,
  SendIcon,
  StarIcon,
  TriangleAlertIcon,
  UserRoundX,
  Users2Icon,
} from 'lucide-react';
import RoleBadge from './role-badge';

export default function Navbar() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const home =
    user?.role === 'student'
      ? '/student'
      : user?.role === 'tutor'
        ? '/tutor'
        : '/admin';

  return (
    <div className="sticky z-50 top-0 inset-x-0 h-16 !backdrop-blur-xl bg-lightbrown/50">
      <header className="relative border-b">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center justify-between text-text">
            {/* left */}
            <div className="ml-4 flex items-center gap-2">
              <Link
                href="/login"
                className="flex items-center gap-2 mr-4 font-bold"
              >
                <div className="flex items-center gap-4">
                  <Icons.logo className="h-8 w-8" />
                  <p className="font-bold">อย่าหาว่าพี่สอน</p>
                </div>
              </Link>
            </div>
            {/* rights */}
            <div className="lg:hidden ml-4 flex items-center gap-2">
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
                  <DropdownMenuContent className="w-full -translate-x-2">
                    <DropdownMenuGroup className="space-y-2">
                      <DropdownMenuLabel className="flex items-center gap-2 text-text">
                        <p>{user.name}</p>
                        <RoleBadge role={user.role} />
                      </DropdownMenuLabel>
                      <DropdownMenuLabel className="-mt-3 font-normal text-sm">
                        {user.email}
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <Separator />
                    <div className="flex-col">
                      <DropdownMenuItem asChild>
                        <div className="flex items-center gap-2">
                          <HomeIcon className="h-4 w-4" />
                          <Link href={home}>Home</Link>
                        </div>
                      </DropdownMenuItem>
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
                              <SendIcon size={16} />
                              <Link href="/student/posts">Posts</Link>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                              <BookIcon size={16} />
                              <Link href="/student/requests">Requests</Link>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                              <StarIcon size={16} />
                              <Link href="/student/reviews">Reviews</Link>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div className="flex items-center gap-2">
                              <TriangleAlertIcon size={16} />
                              <Link href="/reports">Reports</Link>
                            </div>
                          </DropdownMenuItem>
                        </>
                      ) : user.role === 'tutor' ? (
                        <>
                          <DropdownMenuItem asChild>
                            <div className="flex items-center gap-2">
                              <SearchIcon size={16} />
                              <Link href="/tutor/search">Searchs</Link>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <div className="flex items-center gap-2">
                              <Users2Icon size={16} />
                              <Link href="/tutor/requests">Requests</Link>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <div className="flex items-center gap-2">
                              <StarIcon size={16} />
                              <Link href="/tutor/reviews">Reviews</Link>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <div className="flex items-center gap-2">
                              <TriangleAlertIcon size={16} />
                              <Link href="/reports">Reports</Link>
                            </div>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuItem asChild>
                            <div className="flex items-center gap-2">
                              <UserRoundX size={16} />
                              <Link href="/admin/blacklist">Blacklist</Link>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <div className="flex items-center gap-2">
                              <TriangleAlertIcon size={16} />
                              <Link href="/admin/report">Reports</Link>
                            </div>
                          </DropdownMenuItem>
                        </>
                      )}
                    </div>
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
                <div className="flex lg:gap-4 items-center">
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
