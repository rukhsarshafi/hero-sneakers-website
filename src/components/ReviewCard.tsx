import React from "react";
import { format } from "date-fns";
import { BadgeCheckIcon } from "lucide-react";
import { RatingStars } from "./RatingStars";
import type { Review } from "../types/product";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="flex h-full flex-col rounded-sm border border-white/10 bg-ink-900 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <RatingStars rating={review.rating} size="md" />
        <time dateTime={review.date} className="text-xs text-steel">
          {format(new Date(review.date), "d MMM yyyy")}
        </time>
      </div>
      <h4 className="mt-4 font-display text-base font-bold">{review.title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-silver">{review.body}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-xs">
        <span className="flex items-center gap-1.5 font-semibold text-white">
          {review.name}
          {review.verified &&
          <span className="flex items-center gap-1 font-normal text-silver">
              <BadgeCheckIcon className="h-3.5 w-3.5" aria-hidden="true" /> Verified buyer
            </span>
          }
        </span>
        <span className="text-steel">Size EU {review.size}</span>
        <span className="text-steel">{review.fit}</span>
      </div>
    </article>);

}