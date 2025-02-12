import { PostDTO } from '@/dtos/post';
import { getStudentPosts } from '@/lib/api/post';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const usePosts = (): UseQueryResult<PostDTO[]> => {
  return useQuery<PostDTO[]>({
    queryKey: ['posts'],
    queryFn: getStudentPosts,
  });
};
