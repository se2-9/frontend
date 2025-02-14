import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

export default function RoleBadge({ role }: { role: string }) {
  return (
    <Badge
      className={cn('w-fit text-text', {
        'bg-orange': role === 'tutor',
        'bg-blue': role === 'student',
      })}
    >
      {role}
    </Badge>
  );
}
