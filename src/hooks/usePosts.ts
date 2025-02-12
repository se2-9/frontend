import { getStudentPosts } from '@/lib/api/post';
import { useQuery } from '@tanstack/react-query';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getStudentPosts,
  });
};
