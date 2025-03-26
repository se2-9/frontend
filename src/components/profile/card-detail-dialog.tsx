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
import { CardDTO } from '@/dtos/card';

interface CardDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  card?: CardDTO;
}

export const CardDetailsDialog = ({
  isOpen,
  onClose,
  card,
}: CardDetailsDialogProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="w-full max-w-md md:max-w-lg p-6 max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            {card?.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <p className="text-sm flex items-center gap-2">
              {card?.name}
            </p>
          </div>

          <p className="px-2 max-w-sm md:max-w-md text-sm text-muted-foreground break-words">
            {card?.number}
          </p>
          <Separator />
          <p className="px-2 max-w-sm md:max-w-md text-sm text-muted-foreground break-words">
            {card?.expiration_month}
          </p>
          <Separator />

          <p className="px-2 max-w-sm md:max-w-md text-sm text-muted-foreground break-words">
            {card?.expiration_year}
          </p>

          <Separator />

          <p className="px-2 max-w-sm md:max-w-md text-sm text-muted-foreground break-words">
            {card?.cvv}
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
