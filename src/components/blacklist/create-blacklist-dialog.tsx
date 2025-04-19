import { UserDTO } from '@/dtos/user';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateBlacklistData } from '@/lib/validations/blackist';
import { PlusIcon, CheckIcon, ChevronsUpDownIcon } from 'lucide-react';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';

interface CreateBlacklistDialogProps {
  users: UserDTO[];
  onSubmit: (data: CreateBlacklistData) => void;
}

export function CreateBlacklistDialog({
  users,
  onSubmit,
}: CreateBlacklistDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  const form = useForm<CreateBlacklistData>({
    defaultValues: {
      email: '',
      content: '',
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    if (selectedEmail) {
      onSubmit({
        email: selectedEmail,
        content: data.content,
      });
      setOpen(false);
      form.reset();
      setSelectedEmail(null);
    }
  });

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      modal={false}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4 mr-2" />
          Add Blacklist
        </Button>
      </DialogTrigger>
      <DialogOverlay className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" />
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add to Blacklist</DialogTitle>
          <DialogDescription>
            Select a user and provide a reason to add them to the blacklist.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* User Combobox */}
            <div className="grid gap-2">
              <Label htmlFor="email">User</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between"
                  >
                    {selectedEmail
                      ? users.find((user) => user.email === selectedEmail)
                          ?.email
                      : 'Select user...'}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[400px] p-0">
                  <Command>
                    <CommandInput placeholder="Search email..." />
                    <CommandEmpty>No users found.</CommandEmpty>
                    <CommandGroup>
                      {users.map((user) => (
                        <CommandItem
                          key={user.email}
                          value={user.email}
                          onSelect={() => {
                            setSelectedEmail(user.email);
                          }}
                          className="flex flex-col items-start"
                        >
                          <div className="flex items-center w-full">
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                selectedEmail === user.email
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            <span className="font-medium">{user.email}</span>
                          </div>
                          {user.name && (
                            <span className="text-sm text-muted-foreground pl-6">
                              {user.name}
                            </span>
                          )}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Content Textarea */}
            <div className="grid gap-2">
              <Label htmlFor="content">Reason</Label>
              <Textarea
                id="content"
                placeholder="Enter reason for blacklisting"
                {...form.register('content')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={!selectedEmail}
            >
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
