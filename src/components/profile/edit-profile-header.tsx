import { useAuthStore } from '@/store/auth-store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function ProfileView() {
  const user = useAuthStore((state) => state.user);
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src={user?.email[0]} />
        <AvatarFallback>{user?.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>
    </div>
  );
}
