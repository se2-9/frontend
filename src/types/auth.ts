import { UserDTO } from '@/dtos/user';
import { ApiResponse } from './api';

export type LoginResponse = ApiResponse<{
  access_token: string;
  user: UserDTO;
}>;
