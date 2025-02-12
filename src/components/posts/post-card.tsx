import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PostCardProps {
  user_id: string;
  username: string;
  email: string;
  title: string;
  subject: string;
  gender: string;
  is_online: boolean;
  place: string;
  hourly_rate: number;
  description: string;
  created_at: string;
}

export const PostCard = ({
  username,
  email,
  title,
  subject,
  gender,
  is_online,
  place,
  hourly_rate,
  description,
  created_at,
}: PostCardProps) => {
  return (
    <Card className="w-full rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{subject}</CardDescription>
        <Badge
          variant={is_online ? 'default' : 'secondary'}
          className="w-fit"
        >
          {is_online ? 'Online' : 'Offline'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">
              {username} ({gender ? gender : 'N/A'})
            </p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Location:</span> {place}
          </p>
          <p className="text-sm">
            <span className="font-medium">Hourly Rate:</span> ${hourly_rate} /
            hr
          </p>
          <p className="text-xs text-gray-500">
            Created at: {new Date(created_at).toLocaleDateString()}
          </p>
        </div>

        <Separator />

        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
