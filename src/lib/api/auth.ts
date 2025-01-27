import {
  LoginFormData,
  loginSchema,
  RegisterFormData,
  registerSchema,
} from '../validations/auth';
import { apiClient } from './axios';

export async function register(data: RegisterFormData) {
  const validatedData = registerSchema.parse(data);

  const res = await apiClient.post('/auth/register', validatedData);

  return res.data;
}

export async function login(data: LoginFormData) {
  const validatedData = loginSchema.parse(data);

  const res = await apiClient.post('/auth/login', validatedData);

  return res.data;
}
