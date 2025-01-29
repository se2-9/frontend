import { ApiResponse } from './api';

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type UserProfile = {
  email: string;
};

export type LoginResponse = ApiResponse<AuthToken>;
