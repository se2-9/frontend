import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { deletePost } from '@/lib/api/post';
import { toast } from 'sonner';
import { PostDTO } from '@/dtos/post';
import { useState } from 'react';

interface PostCardProps {
  post: PostDTO;
  onDelete?: (postId: string) => void;
}

export const PostCard = ({ post, onDelete }: PostCardProps) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const mutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      toast.success('Post deleted');
      setIsDeleted(true);
      if (onDelete) onDelete(post.post_id);
    },
  });

  if (isDeleted) return null;

  return (
    <Card className="w-full rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-lg font-semibold">{post.title}</CardTitle>
          <Button
            variant="destructive"
            onClick={() => {
              mutation.mutate(post.post_id);
            }}
          >
            Delete
          </Button>
        </div>
        <CardDescription>{post.subject}</CardDescription>
        <Badge
          variant={post.is_online ? 'default' : 'secondary'}
          className="w-fit"
        >
          {post.is_online ? 'Online' : 'Offline'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">
              {post.username} ({post.gender ? post.gender : 'N/A'})
            </p>
            <p className="text-sm text-muted-foreground">{post.email}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Location:</span> {post.place}
          </p>
          <p className="text-sm">
            <span className="font-medium">Hourly Rate:</span> $
            {post.hourly_rate} / hr
          </p>
          <p className="text-xs text-gray-500">
            Created at: {new Date(post.created_at).toLocaleDateString()}
          </p>
        </div>

        <Separator />

        <p className="text-sm text-muted-foreground">{post.description}</p>
      </CardContent>
    </Card>
  );
};
