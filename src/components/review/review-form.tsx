import { ReviewRequest, reviewSchema } from '@/lib/validations/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel } from './form';
import { Button } from './button';
import { StarIcon } from 'lucide-react';
import { Textarea } from './textarea';
import { reviewPost } from '@/lib/api/review';

interface ReviewFormProps {
  post_id: string;
  tutor_id: string;
}

export default function ReviewForm({ post_id, tutor_id }: ReviewFormProps) {
  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      post_id,
      tutor_id,
      rating: 0,
      subject: '',
    },
  });

  const mutation = useMutation({
    mutationFn: reviewPost,
    onSuccess: (data) => {
      if (!data.result) {
        toast.error('Something went wrong');
        return;
      }
      try {
        console.log(data);
        toast.success('Review submitted successfully');
      } catch (error) {
        console.error(error);
        toast.error('Something went wrong');
      }
      console.log(data);
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.message);
    },
  });

  function onSubmit(values: ReviewRequest) {
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          name="rating"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="rating">Rating</FormLabel>
              <FormControl>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      size={32}
                      className={`cursor-pointer ${
                        star <= field.value
                          ? 'fill-yellow-500 text-yellow-500'
                          : 'text-gray-300'
                      }`}
                      onClick={() => {
                        field.onChange(star);
                      }}
                    />
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="subject"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="subject">Subject</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full text-text bg-app-lightbrown"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
