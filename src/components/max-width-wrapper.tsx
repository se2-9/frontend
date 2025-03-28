import { cn } from '@/lib/utils';
import React from 'react';

export default function MaxWidthWrapper({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn('mx-auto w-full px-2.5 md:px-20', className)}>
      {children}
    </div>
  );
}
