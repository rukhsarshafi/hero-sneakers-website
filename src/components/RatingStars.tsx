import React from "react";
import { StarIcon } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: "h-3.5 w-3.5", md: "h-4 w-4", lg: "h-5 w-5" };

export function RatingStars({ rating, count, size = "sm", className = "" }: RatingStarsProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-0.5" role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
        {Array.from({ length: 5 }).map((_, index) => {
          const fill = Math.max(0, Math.min(1, rating - index));
          return (
            <span key={index} className={`relative inline-block ${sizeMap[size]}`}>
              <StarIcon className={`absolute inset-0 ${sizeMap[size]} fill-white/15 text-transparent`} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <StarIcon className={`${sizeMap[size]} fill-white text-transparent`} />
              </span>
            </span>);

        })}
      </div>
      {count !== undefined &&
      <span className="text-xs text-silver">
          {rating.toFixed(1)} <span className="text-steel">({count})</span>
        </span>
      }
    </div>);

}