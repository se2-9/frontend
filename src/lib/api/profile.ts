import { ApiResponse } from './../../types/api';
// import { LoginResponse } from '@/types/auth';
import {
  AddCardFormRequest,
  AddCardFormSchema,
  EditUserProfileRequest,
  EditUserProfileSchema,
} from '../validations/profile';
import { apiClient, handleAxiosError } from './axios';
import { UserDTO } from '@/dtos/user';
import { CardDTO } from '@/dtos/card';
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

export async function addCard(
  data: AddCardFormRequest
): Promise<ApiResponse<CardDTO>> {
  const validatedData = AddCardFormSchema.parse(data);
  try {
    const res = await apiClient.post('user/add-card', validatedData);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function fetchCards(): Promise<ApiResponse<CardDTO[]>> {
  try {
    const res = await apiClient.get('user/get-cards');
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
export async function removeCard(
  data: AddCardFormRequest
): Promise<ApiResponse<CardDTO>> {
  const validatedData = AddCardFormSchema.parse(data);
  try {
    const res = await apiClient.post('user/add-card', validatedData);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}
