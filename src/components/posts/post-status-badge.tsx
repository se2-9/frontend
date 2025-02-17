import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

interface PostStatusBadgeProps {
  isOnline: boolean;
}

export default function PostStatusBadge({ isOnline }: PostStatusBadgeProps) {
  return (
    <Badge
      variant={isOnline ? 'default' : 'secondary'}
      className={cn('w-fit', {
        'bg-app-green text-green-800': isOnline,
        'bg-app-orange text-orange-900': !isOnline,
      })}
    >
      {isOnline ? 'Online' : 'Onsite'}
    </Badge>
  );
}
