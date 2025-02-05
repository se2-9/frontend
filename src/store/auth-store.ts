import { DtoToUser } from '@/utils/mapper/user-mapper';
import { create } from 'zustand';
import { apiClient } from '@/lib/api/axios';
import { User } from '@/types/user';
import { refreshAccessToken } from '@/lib/api/auth';
import { ApiResponse } from '@/types/api';
import { UserDTO } from '@/dtos/user';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (token: string | null, user: User | null) => void;
  initializeAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  setAuth: (token, user) => set({ accessToken: token, user }),

  initializeAuth: async () => {
    try {
      const response = await refreshAccessToken();
      const accessToken = response.result?.access_token;
      apiClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

      const userProfileResp = await apiClient.get<ApiResponse<UserDTO>>(
        '/auth/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      set({
        accessToken: accessToken,
        user: DtoToUser(userProfileResp.data.result!),
      });
    } catch (error) {
      console.error('Failed to refresh token, user needs to login: ', error);
      set({ accessToken: null, user: null });
    }
  },

  logout: async () => {
    await apiClient.post('/auth/logout');
    set({ accessToken: null });
  },
}));
