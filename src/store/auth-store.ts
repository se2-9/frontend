import { getUserProfile, logout } from '@/lib/api/auth';
import { User } from '@/types/user';
import { DtoToUser } from '@/utils/mapper/user-mapper';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  accessToken: string | null;
  refreshToken: string | null;
  setToken: (accessToken: string, refreshToken: string) => void;
  fetchUser: () => Promise<void>;
  isAuth: boolean;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuth: false,
      setUser: (user) => set({ user }),
      setToken: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),
      logout: async () => {
        const refreshToken = get().refreshToken;
        if (!refreshToken) return;

        try {
          await logout();
        } catch (error) {
          console.error('logout failed: ', error);
        }
        set({ user: null, accessToken: null, refreshToken: null });
        localStorage.removeItem('auth-store');
      },
      fetchUser: async () => {
        try {
          const res = await getUserProfile();

          set({ user: DtoToUser(res.result!), isAuth: true });
        } catch (error) {
          console.error(error);
          set({ user: null, isAuth: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
