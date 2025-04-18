import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface RoleBadgeProps {
  role: 'student' | 'tutor' | 'admin';
}

export default function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Badge
      variant="default"
      className={cn('w-fit px-3 py-1 rounded-md font-medium text-sm', {
        'bg-app-blue text-blue-900': role === 'student', // Student: Muted Blue
        'bg-app-lightbrown text-brown-900': role === 'tutor', // Tutor: Light Brown
        'bg-black text-white': role === 'admin',
      })}
    >
      {role}
    </Badge>
  );
}
