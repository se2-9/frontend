import { ApiResponse } from './api';

export type AuthToken = {
  access_token: string;
  refresh_token: string;
};

export type UserProfile = {
  email: string;
};

export type LoginResponse = ApiResponse<AuthToken>;
