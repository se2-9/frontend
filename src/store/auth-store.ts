import { getUserProfile, logout, refreshAccessToken } from '@/lib/api/auth';
import { User } from '@/types/user';
import { DtoToUser } from '@/utils/mapper/user-mapper';
import { create } from 'zustand';

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuth: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isAuth: false,

  login: (token, user) => {
    set({ user, accessToken: token, isAuth: true });
  },

  logout: async () => {
    if (!get().isAuth) return;

    set({ user: null, accessToken: null, isAuth: false });

    try {
      await logout();
      set({ user: null, accessToken: null, isAuth: false });
    } catch (error) {
      console.error(error);
    }

    set({ user: null, accessToken: null, isAuth: false });
  },

  fetchUser: async () => {
    if (!get().isAuth) return;

    try {
      const res = await getUserProfile();

      set({ user: DtoToUser(res.result!), isAuth: true });
    } catch (error) {
      console.error(error);
      set({ user: null, isAuth: false });
    }
  },

  refreshAccessToken: async () => {
    if (!get().isAuth) return;

    try {
      const response = await refreshAccessToken();
      const accessToken = response.data.result.access_token;
      set({ accessToken, isAuth: true });
    } catch (error) {
      console.error(error);

      if (!get().isAuth) return;
      get().logout();
    }
  },
}));
