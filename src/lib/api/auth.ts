import { registerTutorSchema } from './../validations/auth';
import { ApiResponse } from './../../types/api';
import { LoginResponse } from '@/types/auth';
import {
  LoginRequest,
  loginSchema,
  RegisterStudentRequest,
  registerStudentSchema,
  RegisterTutorRequest,
  VerifyEmailRequest,
} from '../validations/auth';
import { apiClient } from './axios';
import { AxiosError } from 'axios';
import { UserDTO } from '@/dtos/user';
import { useAuthStore } from '@/store/auth-store';

export async function registerStudent(data: RegisterStudentRequest) {
  const validatedData = registerStudentSchema.parse(data);

  try {
    const res = await apiClient.post('/auth/register-student', validatedData);

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function registerTutor(data: RegisterTutorRequest) {
  const validatedData = registerTutorSchema.parse(data);

  try {
    const res = await apiClient.post('/auth/register-student', validatedData);

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const validatedData = loginSchema.parse(data);

  try {
    const res = await apiClient.post<LoginResponse>(
      '/auth/login',
      validatedData
    );

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
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
    throw handleAxiosError(error);
  }
}

export async function logout() {
  try {
    await apiClient.post('/auth/logout', null, { withCredentials: true });
  } catch (error) {
    throw handleAxiosError(error);
  } finally {
    useAuthStore.getState().logout();
  }
}

export async function verifyEmail(
  data: VerifyEmailRequest
): Promise<ApiResponse<{ verified: boolean }>> {
  const { email, code } = data;
  try {
    const res = await apiClient.post('/auth/verify-email', {
      email,
      code,
    });

    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
}

export async function refreshAccessToken(): Promise<LoginResponse> {
  try {
    const res = await apiClient.get('/auth/refresh');
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data.message === 'Unauthorized') {
        throw new Error('Token is expired');
      }
    }
    throw handleAxiosError(error);
  }
}

function handleAxiosError(error: unknown): Error {
  if (error instanceof AxiosError) {
    return new Error(error.response?.data.message || error.message);
  }
  return new Error('Something went wrong');
}
