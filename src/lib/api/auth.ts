import { ApiResponse } from './../../types/api';
import { LoginResponse } from '@/types/auth';
import {
  LoginFormData,
  loginSchema,
  RegisterFormData,
  registerSchema,
} from '../validations/auth';
import { apiClient } from './axios';
import { AxiosError } from 'axios';
import { UserDTO } from '@/dtos/user';
import { useAuthStore } from '@/store/auth-store';

export async function register(data: RegisterFormData) {
  const validatedData = registerSchema.parse(data);

  try {
    const res = await apiClient.post('/auth/register', validatedData);

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw new Error('Something went wrong');
  }
}

export async function login(data: LoginFormData): Promise<LoginResponse> {
  const validatedData = loginSchema.parse(data);

  try {
    const res = await apiClient.post<LoginResponse>(
      '/auth/login',
      validatedData
    );

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw new Error('Something went wrong');
  }
}

export async function getUserProfile(): Promise<ApiResponse<UserDTO>> {
  const token = useAuthStore.getState().accessToken;

  try {
    const res = await apiClient.get<ApiResponse<UserDTO>>('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw new Error('Something went wrong');
  }
}

export async function logout() {
  const token = useAuthStore.getState().refreshToken;

  try {
    await apiClient.post('/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message || error.message);
    }
    throw new Error('Something went wrong');
  }
}
