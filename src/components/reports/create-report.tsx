'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Form, FormField, FormItem, FormControl, FormLabel } from '../ui/form';
import { useAuthStore } from '@/store/auth-store';

import { CreateReportData, CreateReportSchema } from '@/lib/validations/report';
import { createReport } from '@/lib/api/report';

export default function CreateReport() {
  const form = useForm<CreateReportData>({
    resolver: zodResolver(CreateReportSchema),
    defaultValues: {
      content: '',
    },
  });
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createReport,
    onSuccess: (data) => {
      if (!data.result) {
        toast.error('Something went wrong');
        return;
      }
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      toast.success('Report created successfully!');
      form.reset();
    },
    onError: (err) => {
      console.error('❌ Full error creating Report:', err);
      if (err instanceof Error) {
        toast.error(err.message || 'Error creating Report');
      } else {
        toast.error('Unexpected error');
      }
    },
  });

  function onSubmit(values: CreateReportData) {
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      toast.error('Authentication error: No token found');
      return;
    }
    mutation.mutate(values);
  }

  return (
    <div className="max-w-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 h-[480px] overflow-scroll"
        >
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    placeholder="Enter problem description for report"
                    className="w-full h-24 resize-none p-2 border border-input bg-background rounded-md"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-lightbrown text-text"
          >
            Create Report
          </Button>
        </form>
      </Form>
    </div>
  );
}
