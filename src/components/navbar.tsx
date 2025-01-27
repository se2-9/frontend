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

export default function Navbar() {
  const user = 'foo';
  return (
    <div className="sticky z-50 top-0 inset-x-0 h-16 backdrop-blur-lg">
      <header className="relative border-b">
        <MaxWidthWrapper>
          <div className="flex h-16 items-center justify-between">
            {/* left */}
            <div className="ml-4 flex items-center gap-2 lg:ml-0">
              <Link
                href="/"
                className="flex items-center gap-2 mr-4 font-bold"
              >
                {/* <Icons.logo className="h-20 w-20" /> */}
                อย่าหาว่าพี่สอน
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'hidden md:inline-block'
                )}
                href="/posts"
              >
                Posts
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'hidden md:inline-block'
                )}
                href="/learning"
              >
                Learning
              </Link>
              <Link
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'hidden md:inline-block'
                )}
                href="/students"
              >
                Students
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
                        src="https://github.com/macgeargear.png"
                        alt="@macgeargear"
                      />
                      <AvatarFallback>G</AvatarFallback>
                    </Avatar>
                    {/* </Button> */}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Macgeargear</DropdownMenuLabel>
                      <DropdownMenuLabel className="-mt-3 font-normal text-sm">
                        macgeargear@gmail.com
                      </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <Separator />
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>My students</DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem>logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div>
                  <Link
                    href="/login"
                    className={cn(buttonVariants({ variant: 'ghost' }))}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={cn(buttonVariants({ variant: 'ghost' }))}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
            <MobileMenu user={user} />
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
