import { ApiResponse } from './../../types/api';
// import { LoginResponse } from '@/types/auth';
import {
  EditUserProfileRequest,
  EditUserProfileSchema,
} from '../validations/profile';
import { apiClient, handleAxiosError } from './axios';
import { UserDTO } from '@/dtos/user';
// import { useAuthStore } from '@/store/auth-store';

export async function editUserProfile(
  data: EditUserProfileRequest
): Promise<ApiResponse<UserDTO>> {
  const validatedData = EditUserProfileSchema.parse(data);
  try {
    const res = await apiClient.post('/user/edit-profile', validatedData);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function deleteUser() {
  try {
    const res = await apiClient.delete('/user');
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}