"use client";

import * as React from "react";
import { Star } from "lucide-react"; // ✅ Import Star icon from lucide-react
import { cn } from "@/lib/utils";

interface StarRatingProps {
    value: number
    onChange: (value: number) => void
    size?: "sm" | "md" | "lg"
    disabled?: boolean
    className?: string
  }

const sizes = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const StarRating = React.forwardRef<HTMLDivElement, StarRatingProps>(
  ({ value, onChange, size = "md", disabled, className, ...props }, ref) => {
    const [hover, setHover] = React.useState<number | null>(null);

    return (
      <div ref={ref} className={cn("flex gap-1", className)} {...props}>
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !disabled && onChange(star)}
            onMouseEnter={() => !disabled && setHover(star)}
            onMouseLeave={() => !disabled && setHover(null)}
            className="focus:outline-none"
            disabled={disabled}
          >
            <Star
              className={cn(
                sizes[size],
                "transition-colors",
                (hover ?? value) >= star ? "text-yellow-400" : "text-gray-300",
                disabled && "cursor-not-allowed opacity-50"
              )}
              fill={(hover ?? value) >= star ? "currentColor" : "none"} // ✅ Filled for selected stars
            />
          </button>
        ))}
      </div>
    );
  }
);

StarRating.displayName = "StarRating";

export { StarRating };
