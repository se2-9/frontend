'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const checkAuth = async () => {
      await initializeAuth();

      const { accessToken, user } = useAuthStore.getState();

      setLoading(false);

      if (!accessToken || !user) {
        toast.info('Session expired, please login again');
        router.push('/login');
      }
    };

    checkAuth();
  }, [initializeAuth, router]);

  if (loading) {
    return (
      <div className="min-h-screen grid place-content-center w-full">
        <Icons.logo className="h-52 w-52 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
