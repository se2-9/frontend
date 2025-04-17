'use client';

import { useEffect, useCallback, useState } from 'react';
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
  const [hydrated, setHydrated] = useState(false);

  const checkAuth = useCallback(async () => {
    const { accessToken, expiresAt, user } = useAuthStore.getState();

    if (expiresAt && new Date(expiresAt * 1000) < new Date()) {
      toast.info('Session expired, please login again');
      useAuthStore.getState().logout();
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
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    checkAuth();
  }, [checkAuth, router, hydrated]);

  return <>{children}</>;
}
