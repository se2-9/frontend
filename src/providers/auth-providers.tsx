'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { toast } from 'sonner';
import { Icons } from '@/components/icons';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { initializeAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    const { accessToken, expiresAt, user } = useAuthStore.getState();

    if (expiresAt && new Date(expiresAt) < new Date()) {
      console.log(new Date(expiresAt), new Date())
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
    checkAuth().then(() => {
      setLoading(false);
    });
  }, [checkAuth, router]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-content-center w-full">
        <Icons.logo className="h-52 w-52 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
