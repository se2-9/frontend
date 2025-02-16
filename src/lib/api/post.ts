import { CreatePostData } from '../validations/post';
import { createPostSchema } from '../validations/post';
import { apiClient, handleAxiosError } from './axios';
import { ApiResponse } from '@/types/api';
import { PostDTO } from '@/dtos/post';

export async function createPost(data: CreatePostData) {
  const validatedData = createPostSchema.parse(data);
  try {
    const res = await apiClient.post('/post', validatedData);

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function getStudentPosts(): Promise<ApiResponse<PostDTO[]>> {
  try {
    const res = await apiClient.get('/post/student');

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function deletePost(postId: string) {
  try {
    const res = await apiClient.delete(`/post/${postId}`);

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
