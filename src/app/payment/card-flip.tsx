'use client';

import type React from 'react';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CardFlipProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export function CardFlip({ front, back, className }: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className={cn('relative w-full h-full perspective-1000', className)}
      onDoubleClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-500 transform-style-preserve-3d',
          isFlipped ? 'rotate-y-180' : ''
        )}
      >
        <div className="absolute w-full h-full backface-hidden">{front}</div>
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  );
}
