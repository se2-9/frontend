import { PostDTO, PostWithTutorDTO } from '@/dtos/post';
import { getStudentMatchedPosts, getStudentPosts } from '@/lib/api/post';
import { ApiResponse } from '@/types/api';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const usePosts = (): UseQueryResult<ApiResponse<PostDTO[]>> => {
  return useQuery<ApiResponse<PostDTO[]>>({
    queryKey: ['posts'],
    queryFn: getStudentPosts,
  });
};

export const useMatchedPost = (): UseQueryResult<ApiResponse<PostWithTutorDTO[]>> =>{
  return useQuery<ApiResponse<PostWithTutorDTO[]>>({
    queryKey: ['matched-posts'],
    queryFn: getStudentMatchedPosts,
  })
}
