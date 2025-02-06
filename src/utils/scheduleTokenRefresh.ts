import { refreshAccessToken } from '@/lib/api/auth';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

export function scheduleTokenRefresh(expiresAt: number) {
  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiration = expiresAt - now;

  if (timeUntilExpiration > 0) {
    console.log(`Token will refresh in ${timeUntilExpiration - 10} seconds`);

    setTimeout(
      async () => {
        try {
          const { accessToken, setAuth, user } = useAuthStore.getState();
          if (!accessToken) return;

          // Refresh token before it expires
          const response = await refreshAccessToken();
          const res = response.result;
          if (!res) throw new Error('No access token received');

          setAuth(res?.access_token, res?.expires_at, user);
        } catch (error) {
          console.error('Failed to refresh token:', error);
          toast.info('Session expired. Redirecting to login...');
          useAuthStore.getState().logout();

          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      },
      (timeUntilExpiration - 10) * 1000
    ); // Refresh 10 seconds before expiration
  } else {
    console.error('Token has already expired');
    toast.info('Session expired. Redirecting to login...');
    useAuthStore.getState().logout();

    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  }
}
