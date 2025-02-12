'use client';

import VerifyCode from '@/components/auth/verify-code';
import { Loader2Icon } from 'lucide-react';
import { Suspense } from 'react';

export default function Page() {

  return (
    <Suspense fallback={<Loader2Icon className='animate-spin'/>}>
      <VerifyCode />
    </Suspense>
  );
}
