import { PostDTO } from '@/dtos/post';
import { getStudentPosts } from '@/lib/api/post';
import { ApiResponse } from '@/types/api';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const usePosts = (): UseQueryResult<ApiResponse<PostDTO[]>> => {
  return useQuery<ApiResponse<PostDTO[]>>({
    queryKey: ['posts'],
    queryFn: getStudentPosts,
  });
};
