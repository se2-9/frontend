'use client';

import { useAuthStore } from '@/store/auth-store';
import { Loader2Icon } from 'lucide-react';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);

  if (user == null) {
    return (
      <div className="min-h-screen grid place-content-center">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-content-center text-center">
      Welcome to Profile
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  );
}
