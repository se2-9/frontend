import { LoginResponse } from '@/types/auth';
import {
  LoginFormData,
  loginSchema,
  RegisterFormData,
  registerSchema,
} from '../validations/auth';
import { apiClient } from './axios';
import { AxiosError } from 'axios';

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
