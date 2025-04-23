import { useAuthStore } from '@/store/auth-store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { useState } from 'react';
import { Input } from '../ui/input';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '@/lib/api/profile';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProfileView() {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  const mutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('Account deleted successfully');
      router.push('/login');
    },
    onError: (error) => {
      console.error('Error deleting account:', error);
      toast.error('Failed to delete account');
    },
    onSettled: () => {
      setIsDialogOpen(false);
      setConfirmationText('');
    },
  });

  const handleDelete = () => {
    if (confirmationText !== 'Confirm Delete') {
      alert('You must type "Confirm Delete" to proceed.');
      return;
    }
    mutation.mutate();
  };

  return (
    <div className="space-y-6">
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
      <Button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-700 text-white"
        onClick={() => setIsDialogOpen(true)}
      >
        Delete Account
      </Button>
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="select-none">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <p className="select-none">
            {' '}
            If you want to continue, please type <b>Confirm Delete</b> to
            continue
          </p>
          <Input
            type="text"
            placeholder="Type Confirm Delete to proceed"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            className="mt-2"
          />
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button
              className="bg-red-500 hover:bg-red-700 text-white"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
