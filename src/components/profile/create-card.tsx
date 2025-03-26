'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormField, FormItem, FormControl, FormLabel } from '../ui/form';
import { useAuthStore } from '@/store/auth-store';
import { AddCardFormRequest, AddCardFormSchema } from '@/lib/validations/profile';
import { addCard } from '@/lib/api/profile';

interface CreateCardProps {
    refetch: ()=>void
}


export default function CreateCard({
refetch
}: CreateCardProps) {
  const form = useForm<AddCardFormRequest>({
    resolver: zodResolver(AddCardFormSchema),
    defaultValues: {
      name:"test",
      number:"1234567890123456",
      expiration_month:"01",
      expiration_year:"99",
      cvv:"000"
    },
  });

  const mutation = useMutation({
    mutationFn: addCard,
    onSuccess: (data) => {
      if (!data.result) {
        toast.error('Something went wrong');
        return;
      }
      refetch()
      toast.success('Card added successfully!');
      form.reset();
    },
    onError: (err) => {
      console.error('❌ Full error adding card:', err);
      if (err instanceof Error) {
        toast.error(err.message || 'Error adding card');
      } else {
        toast.error('Unexpected error');
      }
    },
  });

  function onSubmit(values: AddCardFormRequest) {
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      toast.error('Authentication error: No token found');
      return;
    }
    mutation.mutate(values);
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 h-auto overflow-scrol"
        >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter card name"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="number"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter card number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="expiration_month"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Month</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter card expiration month"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="expiration_year"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Year</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter card expiration year"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="cvv"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter card cvv"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
        </div>


          <Button
            type="submit"
            className="w-full bg-lightbrown text-text"
          >
            Create Card
          </Button>
        </form>
      </Form>
    </div>
  );
}
