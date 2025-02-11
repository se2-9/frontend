import { useQuery } from "@tanstack/react-query";
import { CreatePostData, postBackendSchema, transformData } from '../validations/posts';
import { useAuthStore } from '@/store/auth-store';
import { apiClient } from './axios';
import { AxiosError } from 'axios';


export async function fetchPosts(): Promise<CreatePostData[]> {
  const token = useAuthStore.getState().accessToken;
  try {
    const res = await apiClient.get("/post", {
        headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const posts = []
    for (var post of res.data) {
        posts.push(transformData(postBackendSchema.parse(post)))
    }
    return posts;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

function handleAxiosError(error: unknown): Error {
  if (error instanceof AxiosError) {
    return new Error(error.response?.data.message || error.message);
  }
  return new Error('Something went wrong');
}