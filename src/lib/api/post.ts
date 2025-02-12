import { AxiosError } from 'axios';
import { CreatePostData } from '../validations/post';
import { createPostSchema } from '../validations/post';
import { apiClient } from './axios';

export async function createPost(data: CreatePostData) {
  const validatedData = createPostSchema.parse(data);
  try {
    const res = await apiClient.post('/post', validatedData);

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function getStudentPosts() {
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

function handleAxiosError(error: unknown): Error {
  if (error instanceof AxiosError) {
    return new Error(error.response?.data.message || error.message);
  }
  return new Error('Something went wrong');
}
