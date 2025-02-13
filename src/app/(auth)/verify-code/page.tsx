'use client';

import VerifyCode from '@/components/auth/verify-code';
import { Icons } from '@/components/icons';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<Icons.logo className="animate-spin" />}>
      <VerifyCode />
    </Suspense>
  );
}
