'use client';

import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { initializeAuth } = useAuthStore();

  const checkAuth = useCallback(async () => {
    const { accessToken, expiresAt, user } = useAuthStore.getState();

    if (expiresAt && new Date(expiresAt*1000) < new Date()) {
      // console.log(new Date(expiresAt), new Date())
      toast.info('Session expired, please login again');
      router.replace('/login');
      return;
    }

    if (!accessToken || !user) {
      router.replace('/');
      return;
    }

    await initializeAuth();
  }, [initializeAuth, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth, router]);

  return <>{children}</>;
}
