import { useAuthStore } from '@/store/auth-store';
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const NO_AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/verify-email',
];

apiClient.interceptors.request.use(
  (config) => {
    if (!NO_AUTH_ROUTES.some((route) => config.url?.includes(route))) {
      const accessToken = useAuthStore.getState().accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore.getState();
    const originalReq = error.config;

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;

      if (!authStore.isAuth) return Promise.reject(error);

      try {
        await authStore.refreshAccessToken();
        originalReq.headers.Authorization = `Bearer ${authStore.accessToken}`;

        return apiClient(originalReq);
      } catch (error) {
        if (!authStore.isAuth) return Promise.reject(error);
        originalReq._retry = false;
        authStore.logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
