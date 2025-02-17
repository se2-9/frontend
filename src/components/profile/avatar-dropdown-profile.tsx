import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { User } from '@/types/user';
import { ProfileCard } from './profile-card';

export default function AvatarDropdownProfile({ user }: { user: User }) {
  return (
    <div className="w-12 h-12">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="w-12 h-12">
            <AvatarImage src="" />
            <AvatarFallback className="w-full h-full flex items-center justify-center text-lg font-medium bg-app-lightbrown">
              {user?.name[0]}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={10}
          className="bg-transparent shadow-none p-0 border-none translate-x-4"
        >
          {user && <ProfileCard user={user} />}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
