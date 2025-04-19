import { UserDTO } from '@/dtos/user';
import { ApiResponse } from '@/types/api';
import { apiClient, handleAxiosError } from './axios';

export async function getNonBlacklistUsers(): Promise<ApiResponse<UserDTO[]>> {
  try {
    const res = await apiClient.get('/user/non-blacklist');
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
