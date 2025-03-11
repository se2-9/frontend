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
import { User, PhoneCallIcon, MailIcon} from 'lucide-react';
import { TutorContactDTO } from '@/dtos/user';

interface TutorContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tutorInfo?: TutorContactDTO;
}

export const TutorContactDialog = ({
  isOpen,
  onClose,
  tutorInfo,
}: TutorContactDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="w-full max-w-md md:max-w-lg p-6 max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Tutor Contact Info
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm flex items-center gap-2">
              <User size={16} /> <span className="font-medium">Name:</span>{' '}
              {tutorInfo?.name}
            </p>
            <p className="text-sm flex items-center gap-2">
              <MailIcon size={16} /> <span className="font-medium">Email:</span>{' '}
              {tutorInfo?.email}
            </p>
            <p className="text-sm flex items-center gap-2">
              <PhoneCallIcon size={16} /> <span className="font-medium">Phone Number:</span>{' '}
              {tutorInfo?.phone_number}
            </p>

          </div>
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
