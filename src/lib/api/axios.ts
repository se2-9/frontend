import { useAuthStore } from '@/store/auth-store';
import axios, { AxiosError } from 'axios';
// import { refreshAccessToken } from './auth';

export const apiClient = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  // baseURL: 'http://18.211.57.246:8080/api/v1',
  baseURL: 'https://api.findmytutor.macgeargear.dev/api/v1',
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  console.log('config', config.baseURL);
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const authStore = useAuthStore.getState();
//     const originalReq = error.config;

//     if (error.response?.status === 401 && !originalReq._retry) {
//       originalReq._retry = true;

//       if (!authStore.accessToken) return Promise.reject(error);

//       try {
//         const res = await refreshAccessToken();
//         originalReq.headers.Authorization = `Bearer ${res.result?.access_token}`;

//         return apiClient(originalReq);
//       } catch (refreshError) {
//         authStore.logout();
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export function handleAxiosError(error: unknown): Error {
  if (error instanceof AxiosError) {
    return new Error(error.response?.data.message || error.message);
  }
  return new Error('Something went wrong');
}
