'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/confirm-dialog';
import { PostDetailsDialog } from '@/components/posts/post-details-dialog';
import { deletePost } from '@/lib/api/post';
import type { PostDTO } from '@/dtos/post';
import {
  Eye,
  Trash2,
  MapPin,
  DollarSign,
  User,
  BookOpen,
  SendIcon,
  AtSignIcon,
} from 'lucide-react';

import { Icons } from '../icons';
import Link from 'next/link';
import PostStatusBadge from './post-status-badge';

interface PostCardProps {
  post: PostDTO;
  onDelete?: (postId: string) => void;
  onRequest?: (postId: string, tutorId: string) => void;
}

export const PostCard = ({ post, onDelete, onRequest }: PostCardProps) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      toast.success('Post deleted successfully');
      setIsDeleted(true);
      if (onDelete) onDelete(post.post_id);
    },
    onError: (error) => {
      toast.error(
        `Failed to delete post: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    },
  });

  if (isDeleted) return null;

  const handleDelete = () => {
    setIsConfirmOpen(false);
    mutation.mutate(post.post_id);
  };

  return (
    <>
      <Card className="w-full flex flex-col h-full rounded-2xl shadow-md hover:shadow-lg transition-shadow bg-white text-text p-4">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BookOpen
                  size={18}
                  className="text-primary"
                />
                {post.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-sm flex items-center gap-2">
                <User
                  size={14}
                  className="text-gray-500"
                />
                {post.username}
                <AtSignIcon size={14} />
                <Link
                  href={`/profile/${post.email}`}
                  className="hover:underline"
                >
                  {post.email}
                </Link>
              </CardDescription>
            </div>
            <PostStatusBadge isOnline={post.is_online} />
          </div>
          <p className="text-sm text-muted-foreground">
            Created on: {new Date(post.created_at).toLocaleDateString()}
          </p>
        </CardHeader>

        <CardContent className="flex-grow space-y-1 mt-2">
          <div className="flex flex-wrap items-center justify-between text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <MapPin
                size={16}
                className="text-gray-500"
              />
              <span>{post.place}</span>
            </div>
            <div className="flex items-center gap-1 font-medium">
              <DollarSign className="text-text" />
              <span className="leading-none text-text">
                {post.hourly_rate} / hr
              </span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-700">
            {post.tutor_gender === 'male' ? (
              <Icons.male
                size={8}
                className="text-text font-medium"
              />
            ) : post.tutor_gender === 'female' ? (
              <Icons.female
                size={8}
                className="text-text font-medium"
              />
            ) : (
              <Icons.any
                size={8}
                className="text-text font-medium"
              />
            )}
            <span>{post.tutor_gender}</span>
          </div>

          <Separator className="my-2" />

          <p className="font-semibold">Description</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.description}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDetailsOpen(true)}
            className="flex items-center gap-2"
          >
            <Eye
              size={16}
              className="text-primary"
            />
            View Details
          </Button>
          {onDelete ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setIsConfirmOpen(true)}
              className="flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          ) : null}
          {onRequest ? (
            <Button
              size="sm"
              className="flex items-center gap-2 bg-app-blue"
              onClick={() => onRequest(post.post_id, '')}
            >
              <SendIcon size={16} />
              Request
            </Button>
          ) : null}
        </CardFooter>
      </Card>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        description="Are you sure you want to delete this post? This action cannot be undone."
      />

      <PostDetailsDialog
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        post={post}
      />
    </>
  );
};
