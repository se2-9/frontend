import { CreatePostData } from '../validations/post';
import { createPostSchema } from '../validations/post';
import { apiClient, handleAxiosError } from './axios';
import { ApiResponse } from '@/types/api';
import { PostDTO, PostWithTutorDTO } from '@/dtos/post';

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

export async function getStudentMatchedPosts(): Promise<ApiResponse<PostWithTutorDTO[]>> {
  try {
    const res = await apiClient.get('/post/match');

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function submitRating(tutor_id: string, post_id: string, rating: number, feedback: string) {
  try {
    const res = await apiClient.post('/ratings', { tutor_id, post_id, rating, feedback });
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function fetchTutorRatings(
  tutor_id: string
): Promise<{ reviews: { studentName: string; subject: string; rating: number; date: string; description: string }[] }> {
  try {
    const res = await apiClient.get(`/ratings/${tutor_id}`);
    return res.data; // ✅ Returns an array of reviews with student details
  } catch (error) {
    throw handleAxiosError(error);
  }
}
