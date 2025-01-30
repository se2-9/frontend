'use client';

import { useAuthStore } from '@/store/auth-store';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserInfo() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuth = useAuthStore((state) => state.isAuth);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }

    if (isAuth && user == null) {
      fetchUser();
    }
  }, [isAuth, user, fetchUser, router]);

  return (
    <div>
      {user == null ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        JSON.stringify(user)
      )}
    </div>
  );
}
