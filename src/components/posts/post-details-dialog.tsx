'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Calendar, DollarSign, User } from 'lucide-react';
import type { PostDTO } from '@/dtos/post';

interface PostDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostDTO;
}

export const PostDetailsDialog = ({
  isOpen,
  onClose,
  post,
}: PostDetailsDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="w-full max-w-md md:max-w-lg p-6 max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {post.title}
          </DialogTitle>
          <p className="text-muted-foreground text-center">{post.subject}</p>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm flex items-center gap-2">
              <User size={16} /> <span className="font-medium">Tutor:</span>{' '}
              {post.username} ({post.tutor_gender || 'N/A'})
            </p>
            <p className="text-sm text-muted-foreground">{post.email}</p>
          </div>

          <Separator />

          <p className="text-sm flex items-center gap-2">
            <DollarSign size={16} /> <span className="font-medium">Rate:</span>{' '}
            ${post.hourly_rate} / hr
          </p>

          <p className="text-sm flex items-center gap-2">
            <MapPin size={16} /> <span className="font-medium">Location:</span>{' '}
            {post.place}
          </p>

          <p className="text-xs text-gray-500 flex items-center gap-2">
            <Calendar size={16} /> Created:{' '}
            {new Date(post.created_at).toLocaleDateString()}
          </p>

          <Separator />

          <p className="px-2 max-w-sm md:max-w-md text-sm text-muted-foreground break-words">
            {post.description}
          </p>
        </div>

        <DialogFooter className="flex justify-center">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
