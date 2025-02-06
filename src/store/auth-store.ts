import { DtoToUser } from '@/utils/mapper/user-mapper';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiClient } from '@/lib/api/axios';
import { User } from '@/types/user';
import { refreshAccessToken } from '@/lib/api/auth';
import { ApiResponse } from '@/types/api';
import { UserDTO } from '@/dtos/user';
import { scheduleTokenRefresh } from '@/utils/scheduleTokenRefresh';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  expiresAt: number | null;
  setAuth: (
    token: string | null,
    expiresIn: number | null,
    user: User | null
  ) => void;
  initializeAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      expiresAt: null,

      setAuth: (token, expiresAt, user) => {
        apiClient.defaults.headers['Authorization'] = token
          ? `Bearer ${token}`
          : '';
        set({ accessToken: token, user, expiresAt: expiresAt });

        if (expiresAt) {
          scheduleTokenRefresh(expiresAt);
        }
      },

      initializeAuth: async () => {
        try {
          const response = await refreshAccessToken();
          const accessToken = response.result?.access_token;
          const expiresAt = response.result?.expires_at;

          if (!accessToken) throw new Error('No access token received');

          apiClient.defaults.headers['Authorization'] = `Bearer ${accessToken}`;

          const userProfileResp =
            await apiClient.get<ApiResponse<UserDTO>>('/auth/me');

          set({
            accessToken,
            expiresAt,
            user: DtoToUser(userProfileResp.data.result!),
          });
        } catch (error) {
          console.error(
            'Failed to refresh token, user needs to login: ',
            error
          );
          set({ accessToken: null, user: null });
        }
      },

      logout: async () => {
        try {
          await apiClient.post('/auth/logout');
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          set({ accessToken: null, user: null });
          localStorage.removeItem('auth');
        }
      },
    }),
    {
      name: 'auth',
    }
  )
);
