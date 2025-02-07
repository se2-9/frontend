import { ApiResponse } from './../../types/api';
// import { LoginResponse } from '@/types/auth';
import {
  EditUserProfileRequest,
  EditUserProfileSchema
} from '../validations/profile';
import { apiClient } from './axios';
import { AxiosError } from 'axios';
import { UserDTO } from '@/dtos/user';
// import { useAuthStore } from '@/store/auth-store';

export async function editUserProfile(data: EditUserProfileRequest): Promise<ApiResponse<UserDTO>> {
  const validatedData = EditUserProfileSchema.parse(data);
  try {
    const res = await apiClient.post('/user/edit-profile', validatedData);
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
