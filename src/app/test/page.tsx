'use client';

import { useAuthStore } from '@/store/auth-store';
import StudentWebSocket from './StudentWebSocket';

export default function Page() {
  const user = useAuthStore((state) => state.user);

  return <div>{user?.id && <StudentWebSocket studentID={user.id} />}</div>;
}
