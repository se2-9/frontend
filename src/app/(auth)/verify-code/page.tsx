'use client';

import MaxWidthWrapper from '@/components/max-width-wrapper';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { verifyEmail } from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Page() {
  const [code, setCode] = useState('');
  const router = useRouter();

  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  const mutation = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success('Email verified');
      router.push('/');
    },
    onError: (err) => {
      toast.error(err.message);
      // router.push('/register')
    },
  });

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && code.length === 6) {
      mutation.mutate({
        email: email!,
        code: code,
      });
    }
  };

  return (
    <MaxWidthWrapper className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <p className="text-lg font-medium">Entered OTP{code}</p>
        <InputOTP
          maxLength={6}
          onChange={setCode}
          value={code}
          pattern="[0-9]*"
          onKeyDown={handleKeyDown}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </MaxWidthWrapper>
  );
}
