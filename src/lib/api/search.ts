import { useQuery } from "@tanstack/react-query";
import { CreatePostData, postBackendSchema, transformData } from '../validations/posts';
import { useAuthStore } from '@/store/auth-store';
import { apiClient } from './axios';
import { AxiosError } from 'axios';
import { ApiResponse } from "@/types/api";
import { PostDTO } from "@/dtos/post";


export async function fetchPosts(): Promise<ApiResponse<PostDTO>> {
  // const token = useAuthStore.getState().accessToken;
  try {
    const res = await apiClient.get("/post", {
      //   headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
    console.log(res.data)
    return res.data;
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