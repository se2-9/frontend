import { apiClient } from './axios';
import { AxiosError } from 'axios';
import { ApiResponse } from "@/types/api";
import { FilterPostDTO, PostDTO } from "@/dtos/post";


export async function fetchPosts(req: FilterPostDTO): Promise<ApiResponse<PostDTO[]>> {
  try {
    const res = await apiClient.get("/post/search",{
      params: req
    });
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